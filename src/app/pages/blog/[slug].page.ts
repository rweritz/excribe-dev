// src/app/pages/blog/[slug].page.ts
import { Component, OnInit, inject, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { LayoutComponent } from '../../components/layout.component';
import { GitHubService, BlogPost } from '../../services/github.service';
import { MarkdownComponent } from '@analogjs/content';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [CommonModule, LayoutComponent, MarkdownComponent],
  template: `
    <app-layout>
      <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div *ngIf="loading()" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
          ></div>
          <p class="mt-4 text-gray-600">Loading post...</p>
        </div>

        <div *ngIf="error()" class="text-center py-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Post
          </h1>
          <p class="text-red-600 mb-4">{{ error() }}</p>
          <button
            (click)="loadBlogPost()"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>

        <div *ngIf="!loading() && !error() && !post()" class="text-center py-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p class="text-gray-600">
            The blog post you're looking for doesn't exist.
          </p>
        </div>

        <article
          *ngIf="!loading() && !error() && post()"
          class="bg-white rounded-lg shadow-sm border p-8"
        >
          <header class="mb-8">
            <div class="flex items-center justify-between mb-4">
              <time class="text-sm text-gray-500">{{ post()!.date }}</time>
              <div class="flex space-x-2">
                <span
                  *ngFor="let tag of post()!.tags"
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
              {{ post()!.title }}
            </h1>
          </header>

          <div class="prose lg:prose-xl max-w-none">
            <analog-markdown [content]="post()!.content"></analog-markdown>
          </div>
        </article>
      </div>
    </app-layout>
  `,
})
export default class BlogPostComponent implements OnInit {
  private githubService = inject(GitHubService);
  private seoService = inject(SeoService);
  private route = inject(ActivatedRoute);

  @Input() slug!: string;

  post = signal<BlogPost | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);

  ngOnInit() {
    // Use ActivatedRoute as fallback if Input slug is undefined
    if (!this.slug) {
      this.route.paramMap.subscribe((params) => {
        const routeSlug = params.get('slug');
        if (routeSlug) {
          this.slug = routeSlug;
          this.loadBlogPost();
        } else {
          this.error.set('No blog post slug found');
          this.loading.set(false);
        }
      });
    } else {
      this.loadBlogPost();
    }
  }

  loadBlogPost() {
    // Guard against undefined slug
    if (!this.slug) {
      console.warn('Slug is undefined, skipping blog post load');
      this.error.set('Invalid blog post URL');
      this.loading.set(false);
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    const filename = `${this.slug}.md`;

    console.log('Loading blog post:', filename);

    this.githubService.getBlogPost(filename).subscribe({
      next: (content) => {
        if (content) {
          const blogPost = this.githubService.parseBlogPost(content, filename);
          this.post.set(blogPost);

          // Update SEO
          this.seoService.updateMetaTags({
            title: `${blogPost.title} - Your Portfolio`,
            description: blogPost.excerpt,
            keywords: blogPost.tags.join(', '),
          });
        } else {
          this.post.set(null);
        }
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading blog post:', err);
        this.error.set('Failed to load blog post. Please try again.');
        this.loading.set(false);
      },
    });
  }
}
