import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';

export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  content?: string;
  encoding?: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  content: string;
  date: string;
  excerpt: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root',
})
export class GitHubService {
  private http = inject(HttpClient);

  // Replace with your GitHub username and repository
  private readonly GITHUB_USERNAME = 'rweritz';
  private readonly REPOSITORY_NAME = 'excribe-blog';
  private readonly BLOG_PATH = 'blog'; // Path to your blog posts in the repo

  private readonly API_BASE = 'https://api.github.com';

  /**
   * Get list of markdown files from GitHub repository
   */
  getBlogPosts(): Observable<GitHubFile[]> {
    const url = `${this.API_BASE}/repos/${this.GITHUB_USERNAME}/${this.REPOSITORY_NAME}/contents/${this.BLOG_PATH}`;

    return this.http.get<GitHubFile[]>(url).pipe(
      map((files) => files.filter((file) => file.name.endsWith('.md'))),
      catchError((error) => {
        console.error('Error fetching blog posts:', error);
        return of([]);
      })
    );
  }

  /**
   * Get specific markdown file content
   */
  getBlogPost(filename: string): Observable<string | null> {
    const url = `${this.API_BASE}/repos/${this.GITHUB_USERNAME}/${this.REPOSITORY_NAME}/contents/${this.BLOG_PATH}/${filename}`;

    console.log('Fetching blog post from URL:', url);

    return this.http.get<GitHubFile>(url).pipe(
      map((file) => {
        if (file.content && file.encoding === 'base64') {
          let content = atob(file.content);
          console.log(content);
          return content;
        }
        return null;
      }),
      catchError((error) => {
        console.error(`Error fetching blog post ${filename}:`, error);
        return of(null);
      })
    );
  }

  /**
   * Parse frontmatter and content from markdown
   */
  parseBlogPost(markdownContent: string, filename: string): BlogPost {
    const lines = markdownContent.split('\n');
    let frontmatterEnd = -1;
    let frontmatter: any = {};

    // Check if file starts with frontmatter
    if (lines[0] === '---') {
      for (let i = 1; i < lines.length; i++) {
        if (lines[i] === '---') {
          frontmatterEnd = i;
          break;
        }
      }

      if (frontmatterEnd > 0) {
        const frontmatterLines = lines.slice(1, frontmatterEnd);
        frontmatterLines.forEach((line) => {
          const [key, ...valueParts] = line.split(':');
          if (key && valueParts.length > 0) {
            const value = valueParts.join(':').trim();
            frontmatter[key.trim()] = value.replace(/['"]/g, '');
          }
        });
      }
    }

    const content = lines
      .slice(frontmatterEnd + 1)
      .join('\n')
      .trim();
    const slug = filename.replace('.md', '');

    return {
      title: frontmatter.title || slug,
      slug,
      content,
      date: frontmatter.date || new Date().toISOString().split('T'),
      excerpt: frontmatter.excerpt || content.substring(0, 150) + '...',
      tags: frontmatter.tags
        ? frontmatter.tags.split(',').map((tag: string) => tag.trim())
        : [],
    };
  }
}
