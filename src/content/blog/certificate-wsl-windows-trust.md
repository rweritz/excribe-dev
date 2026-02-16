---
title: "Use the same Dev Certs for Windows and WSL Ubuntu"
date: "2026-02-16"
slug: "certificate-wsl-windows-trust"
excerpt: "Learn how to trust the same development certificate for dotnet with Windows and WSL Ubuntu"
tags: [".Net", "WSL", "dev-certs"]
---

# How to use the same Dev Certs for Windows and WSL Ubuntu
To get one shared .NET HTTPS dev cert working in both WSL Ubuntu and Windows, you create a custom OpenSSL config (so the cert is also a CA), generate the cert in WSL, trust it in WSL, import the same PFX into `dotnet dev-certs` on both sides, and add it to Windows Trusted Roots.

## 1) Create the OpenSSL config (WSL)
Create a conf file (`aspnet-cert.conf`) that defines the subject (`CN=localhost`) and marks the cert as `CA:true` so Linux can trust it (even though it’s self-signed). Additionally it is important that the extention `1.3.6.1.4.1.311.84.1.1` is set so that dotnet imports it.

Example `aspnet-cert.conf`

```ini
[req]
default_bits = 2048
distinguished_name = dn
req_extensions = req_ext
x509_extensions = x509_ext
prompt = no

[dn]
commonName = localhost

[req_ext]
basicConstraints = critical, CA:true
subjectAltName = @alt_names

[x509_ext]
basicConstraints = critical, CA:true
keyUsage = critical, keyCertSign, cRLSign, digitalSignature, keyEncipherment
extendedKeyUsage = critical, serverAuth
subjectAltName = critical, @alt_names
1.3.6.1.4.1.311.84.1.1 = ASN1:UTF8String:ASP.NET Core HTTPS development certificate

[alt_names]
DNS.1 = localhost
DNS.2 = *.dev.localhost
DNS.3 = *.dev.internal
DNS.4 = host.docker.internal
DNS.5 = host.containers.internal
IP.1 = 127.0.0.1
IP.2 = 0000:0000:0000:0000:0000:0000:0000:0001
```

## 2) Generate the cert + key (WSL)
Commands (run in WSL, in the folder where `aspnet-cert.conf` is located): 

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout aspnet-cert.key \
  -out aspnet-cert.crt \
  -config aspnet-cert.conf
```

(Optional) Verify it’s not trusted yet:

```bash
openssl verify aspnet-cert.crt
```

## 3) Trust it in Ubuntu (WSL)
Commands (run in WSL):

```bash
sudo cp aspnet-cert.crt /usr/local/share/ca-certificates
sudo update-ca-certificates
```

Verify trust now works:

```bash
openssl verify aspnet-cert.crt
```

## 4) Convert to PFX and import into `dotnet dev-certs` (WSL)
Commands (run in WSL):

```bash
openssl pkcs12 -export -out aspnet-cert.pfx -inkey aspnet-cert.key -in aspnet-cert.crt
dotnet dev-certs https --clean --import ./aspnet-cert.pfx -p <PASSWORD>
```

## 5) Use the same PFX in Windows and trust it there too
Copy the PFX from WSL into your Windows profile (run in WSL):

```bash
cp ./aspnet-cert.pfx /mnt/c/Users/<USERNAME>/.aspnet/https
```

Import the certificate into Windows dev-certs (run in PowerShell):

```powershell
dotnet dev-certs https --clean --import "${env:USERPROFILE}\.aspnet\https\aspnet-cert.pfx" -p <PASSWORD>
```

Now the imported file will be visible in the Windows Certificate Manager in the **Personal** section. It is not yet trusted because it's a CA itself that is not yet in the **Trusted Root Certificate Authorities** section.

Trust the imported certificate (run in PowerShell):

```powershell
dotnet dev-certs https --trust
```

Now it can also placed in **Trusted Root Certificate Authorities** and the required trust is in place.
