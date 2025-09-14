---
title: "MCP Server with .NET"
date: "2025-09-14"
excerpt: "Building a Remote MCP Server with .NET"
tags: ["mcp", "dotnet", "http"]
---

# Building a Remote MCP Server with .NET

The Model Context Protocol (MCP) is rapidly becoming the standard for connecting AI applications to external data sources and tools. As a senior .NET developer, understanding how to build robust, production-ready MCP servers with remote capabilities is essential for modern AI-powered applications.

## Understanding MCP Architecture

MCP follows a client-server architecture that enables AI applications to seamlessly integrate with various data sources. The protocol defines three core components:

- **Hosts**: AI applications (like Claude Desktop, VS Code Copilot) that initiate connections
- **Clients**: Connectors within host applications that manage server communications
- **Servers**: Services that provide context, tools, and capabilities to AI systems

The protocol operates on JSON-RPC 2.0 messaging and supports two primary transport mechanisms:
- **STDIO Transport**: For local process communication using standard input/output
- **HTTP Transport**: For remote servers using HTTP POST/GET requests with Server-Sent Events (SSE)

## Core MCP Capabilities

Modern MCP servers can expose several types of capabilities to clients:

### Tools
Functions that AI models can directly invoke to perform actions or retrieve data. Tools enable models to interact with external systems, perform computations, and execute operations.

### Resources  
Static or semi-static data that servers make available as context for LLM interactions. Resources can include file contents, API responses, database records, or any structured information.

### Prompts
Reusable template messages that standardize common AI interactions. Prompts help ensure consistency across teams and applications while reducing repetitive prompt crafting.

## Setting Up Your Development Environment

To build a remote MCP server with .NET, you'll need:

```bash
# Create a new ASP.NET Core project
dotnet new web -n RemoteMcpServer
cd RemoteMcpServer

# Install required packages
dotnet add package ModelContextProtocol.AspNetCore --prerelease
dotnet add package Microsoft.Extensions.Hosting
```

The `ModelContextProtocol.AspNetCore` package provides the essential HTTP transport capabilities for building remote MCP servers that can handle multiple client connections.

## Building the Core Server Implementation

Here's a comprehensive implementation of a remote MCP server:

### Program.cs - Server Configuration

```csharp
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using ModelContextProtocol.Server;
using System.ComponentModel;
using System.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Configure MCP server with HTTP transport
builder.Services.AddMcpServer()
    .WithHttpTransport()
    .WithToolsFromAssembly()
    .WithPromptsFromAssembly()
    .WithResourcesFromAssembly();

// Add additional services
builder.Services.AddHttpClient("external-api", client =>
{
    client.BaseAddress = new Uri("https://api.example.com/");
    client.DefaultRequestHeaders.UserAgent.Add(
        new ProductInfoHeaderValue("mcp-server", "1.0"));
});

// Add health check endpoint
builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure middleware pipeline
app.UseHealthChecks("/health");

// Map MCP endpoints (creates /sse and /message endpoints automatically)
app.MapMcp();

// Optional: Custom endpoint
app.MapGet("/status", () => Results.Ok(new { 
    Server = "Remote MCP Server", 
    Version = "1.0.0",
    Timestamp = DateTime.UtcNow 
}));

app.Run();
```

### Implementing MCP Tools

Tools are the primary way AI models interact with your server. Here's how to implement various types of tools:

```csharp
[McpToolType]
public static class DataTools
{
    private static readonly HttpClient _httpClient = new();

    [McpTool]
    [Description("Fetches current weather data for a specified city")]
    public static async Task<string> GetWeatherAsync(
        [Description("City name")] string city)
    {
        try
        {
            var response = await _httpClient.GetStringAsync(
                $"https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q={city}");
            return response;
        }
        catch (Exception ex)
        {
            return $"Error fetching weather: {ex.Message}";
        }
    }

    [McpTool]
    [Description("Performs mathematical calculations")]
    public static double CalculateAsync(
        [Description("First number")] double a,
        [Description("Operation (+, -, *, /)")] string operation,
        [Description("Second number")] double b)
    {
        return operation switch
        {
            "+" => a + b,
            "-" => a - b,
            "*" => a * b,
            "/" => b != 0 ? a / b : throw new DivideByZeroException(),
            _ => throw new ArgumentException("Invalid operation")
        };
    }

    [McpTool]
    [Description("Retrieves system information")]
    public static object GetSystemInfoAsync()
    {
        return new
        {
            MachineName = Environment.MachineName,
            OSVersion = Environment.OSVersion.ToString(),
            ProcessorCount = Environment.ProcessorCount,
            WorkingSet = Environment.WorkingSet,
            TickCount = Environment.TickCount64
        };
    }
}
```

### Implementing Resources

Resources provide contextual data that AI models can access:

```csharp
[McpResourceType]
public static class ConfigurationResources
{
    [McpResource("application-config")]
    [Description("Application configuration settings")]
    public static Task<string> GetApplicationConfigAsync()
    {
        var config = new
        {
            Environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production",
            ServerTime = DateTime.UtcNow,
            Features = new[] { "Weather", "Calculator", "SystemInfo" }
        };
        
        return Task.FromResult(System.Text.Json.JsonSerializer.Serialize(config));
    }

    [McpResource("api-documentation")]
    [Description("API endpoint documentation")]
    public static Task<string> GetApiDocumentationAsync()
    {
        var documentation = """
        # MCP Server API Documentation
        
        ## Available Tools
        - `GetWeatherAsync(city)`: Retrieves weather data
        - `CalculateAsync(a, operation, b)`: Performs calculations
        - `GetSystemInfoAsync()`: Returns system information
        
        ## Resources
        - `application-config`: Server configuration
        - `api-documentation`: This documentation
        """;
        
        return Task.FromResult(documentation);
    }
}
```

### Implementing Prompts

Prompts provide reusable templates for AI interactions:

```csharp
[McpPromptType]
public static class SystemPrompts
{
    [McpPrompt("analyze-data")]
    [Description("Analyzes provided data and generates insights")]
    public static Task<string> AnalyzeDataPromptAsync(
        [Description("Data to analyze")] string data,
        [Description("Analysis focus area")] string focus = "general")
    {
        var prompt = $"""
        Please analyze the following data with a focus on {focus}:

        {data}

        Provide:
        1. Key insights and patterns
        2. Notable trends or anomalies
        3. Recommendations based on the analysis
        4. Confidence level in your analysis

        Format your response in a clear, structured manner.
        """;
        
        return Task.FromResult(prompt);
    }

    [McpPrompt("system-status")]
    [Description("Generates a comprehensive system status report prompt")]
    public static Task<string> SystemStatusPromptAsync()
    {
        var prompt = """
        Generate a comprehensive system status report including:
        
        1. Current system performance metrics
        2. Resource utilization analysis
        3. Any detected issues or warnings
        4. Recommendations for optimization
        5. Overall system health assessment
        
        Use the available system tools to gather real-time data and provide 
        an accurate, actionable status report.
        """;
        
        return Task.FromResult(prompt);
    }
}
```

## Advanced Configuration Options

### HTTP Transport Configuration

You can customize the HTTP transport behavior:

```csharp
builder.Services.AddMcpServer(options =>
{
    options.ServerInfo = new ServerInfo
    {
        Name = "Advanced MCP Server",
        Version = "2.0.0"
    };
})
.WithHttpTransport(httpOptions =>
{
    httpOptions.Stateless = false; // Enable stateful connections
    httpOptions.MaxMessageSize = 1024 * 1024; // 1MB max message size
})
.WithToolsFromAssembly();
```

### CORS Configuration

For web-based clients, configure CORS appropriately:

```csharp
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("https://your-client-domain.com")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var app = builder.Build();
app.UseCors();
```

### Authentication and Authorization

Implement security for production deployments:

```csharp
builder.Services.AddAuthentication("ApiKey")
    .AddScheme<ApiKeyAuthenticationSchemeOptions, ApiKeyAuthenticationHandler>(
        "ApiKey", options => { });

builder.Services.AddAuthorization();

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();

// Secure MCP endpoints
app.MapMcp().RequireAuthorization();
```

## Deployment Considerations

### Containerization

Create a production-ready Dockerfile:

```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["RemoteMcpServer.csproj", "."]
RUN dotnet restore "RemoteMcpServer.csproj"
COPY . .
RUN dotnet build "RemoteMcpServer.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "RemoteMcpServer.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "RemoteMcpServer.dll"]
```

### Cloud Deployment

For Azure Container Apps deployment, configure the container appropriately:

```bicep
resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: 'mcp-server'
  location: location
  properties: {
    managedEnvironmentId: environment.id
    configuration: {
      ingress: {
        external: true
        targetPort: 8080
        allowInsecure: false
        traffic: [{
          weight: 100
          latestRevision: true
        }]
      }
    }
    template: {
      containers: [{
        name: 'mcp-server'
        image: 'your-registry.azurecr.io/mcp-server:latest'
        resources: {
          cpu: '0.5'
          memory: '1Gi'
        }
        env: [{
          name: 'ASPNETCORE_ENVIRONMENT'
          value: 'Production'
        }]
      }]
    }
  }
}
```

## Testing Your MCP Server

### Local Testing

Test your server locally using the MCP Inspector:

```bash
# Install MCP Inspector
npm install -g @modelcontextprotocol/inspector

# Test your server
mcp-inspector http://localhost:5000/sse
```

### Client Configuration

Configure VS Code or other MCP clients:

```json
{
  "mcp": {
    "servers": {
      "remote-server": {
        "url": "https://your-server.azurecontainerapps.io/sse",
        "type": "sse"
      }
    }
  }
}
```

## Best Practices and Security

### Error Handling

Implement comprehensive error handling:

```csharp
[McpTool]
[Description("Safe file operation with error handling")]
public static async Task<string> SafeFileOperationAsync(string filePath)
{
    try
    {
        // Validate file path
        if (string.IsNullOrWhiteSpace(filePath))
            return "Error: File path cannot be empty";
        
        // Security check - prevent path traversal
        var fullPath = Path.GetFullPath(filePath);
        if (!fullPath.StartsWith(Environment.CurrentDirectory))
            return "Error: Access denied - invalid path";
        
        // Perform operation
        var content = await File.ReadAllTextAsync(fullPath);
        return content;
    }
    catch (FileNotFoundException)
    {
        return "Error: File not found";
    }
    catch (UnauthorizedAccessException)
    {
        return "Error: Access denied";
    }
    catch (Exception ex)
    {
        return $"Error: {ex.Message}";
    }
}
```

### Performance Optimization

Implement caching and async patterns:

```csharp
[McpToolType]
public class CachedDataTools
{
    private static readonly MemoryCache _cache = new MemoryCache(new MemoryCacheOptions
    {
        SizeLimit = 100
    });

    [McpTool]
    [Description("Retrieves cached data with automatic refresh")]
    public static async Task<string> GetCachedDataAsync(string key)
    {
        if (_cache.TryGetValue(key, out string cachedValue))
        {
            return cachedValue;
        }

        // Expensive operation
        var data = await FetchDataFromExternalServiceAsync(key);
        
        _cache.Set(key, data, TimeSpan.FromMinutes(5));
        return data;
    }

    private static async Task<string> FetchDataFromExternalServiceAsync(string key)
    {
        // Simulate external API call
        await Task.Delay(1000);
        return $"Data for {key} - {DateTime.UtcNow}";
    }
}
```

### Monitoring and Logging

Implement comprehensive logging:

```csharp
[McpToolType]
public class MonitoredTools
{
    private static readonly ILogger _logger = 
        LoggerFactory.Create(builder => builder.AddConsole()).CreateLogger<MonitoredTools>();

    [McpTool]
    [Description("Monitored operation with detailed logging")]
    public static async Task<string> MonitoredOperationAsync(string input)
    {
        _logger.LogInformation("Starting monitored operation with input: {Input}", input);
        
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        
        try
        {
            var result = await ProcessDataAsync(input);
            stopwatch.Stop();
            
            _logger.LogInformation("Operation completed successfully in {ElapsedMs}ms", 
                stopwatch.ElapsedMilliseconds);
            
            return result;
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            _logger.LogError(ex, "Operation failed after {ElapsedMs}ms", 
                stopwatch.ElapsedMilliseconds);
            throw;
        }
    }

    private static async Task<string> ProcessDataAsync(string input)
    {
        await Task.Delay(100); // Simulate processing
        return $"Processed: {input}";
    }
}
```

## Conclusion

Building remote MCP servers with .NET provides a powerful foundation for creating AI-integrated applications. The combination of ASP.NET Core's robust hosting capabilities with the MCP protocol's standardized approach enables you to build scalable, maintainable servers that can integrate seamlessly with various AI platforms.

Key takeaways for senior engineers:

1. **Architecture First**: Design your MCP server with clear separation between tools, resources, and prompts
2. **Security by Design**: Implement proper authentication, input validation, and access controls
3. **Performance Matters**: Use caching, async patterns, and proper resource management
4. **Monitoring is Essential**: Implement comprehensive logging and health checks
5. **Documentation**: Provide clear descriptions for all tools, resources, and prompts

The MCP ecosystem is rapidly evolving, and .NET provides excellent tooling and performance characteristics for building production-ready MCP servers that can scale with your AI applications' needs.