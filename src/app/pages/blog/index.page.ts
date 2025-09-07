import { Component, inject, signal, computed, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '../../components/layout.component';
import { injectContentFiles, ContentFile } from '@analogjs/content';

// Blog post interface matching the frontmatter structure
export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [RouterLink, LayoutComponent],
  template: `
    <app-layout>
      <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Blog</h1>

        @if (loading()) {
        <div class="text-center py-8">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
          ></div>
          <p class="mt-4 text-gray-600">Loading posts...</p>
        </div>
        } @if (!loading() && posts().length === 0) {
        <div class="text-center py-8">
          <p class="text-gray-600">No blog posts found.</p>
        </div>
        }

        <div class="space-y-8">
          @for (post of posts(); track post.slug) {
          <article
            class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between mb-4">
              <time class="text-sm text-gray-500">{{ post.date }}</time>
              <div class="flex space-x-2">
                @for (tag of post.tags; track tag) {
                <span
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {{ tag }}
                </span>
                }
              </div>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mb-3">
              <a
                [routerLink]="['/blog', post.slug]"
                class="hover:text-blue-600 transition-colors"
              >
                {{ post.title }}
              </a>
            </h2>

            <p class="text-gray-600 mb-4">{{ post.excerpt }}</p>

            <a
              [routerLink]="['/blog', post.slug]"
              class="text-blue-600 hover:text-blue-800 font-medium"
            >
              Read more →
            </a>
          </article>
          }
        </div>
      </div>
    </app-layout>
  `,
})
export default class BlogComponent {
  // Use injectContentFiles to load all blog posts from content/blog directory
  private contentFiles = injectContentFiles<BlogPost>();

  posts = computed(() => {
    const contentFiles = this.contentFiles;

    if (!Array.isArray(contentFiles)) return [];

    // Filter only blog posts and transform to blog posts with slug
    const blogPosts: BlogPost[] = contentFiles
      .filter((file: ContentFile<BlogPost>) =>
        file.filename.includes('/content/blog/')
      )
      .map((file: ContentFile<BlogPost>) => ({
        ...file.attributes,
        slug: file.slug,
      }));

    // Sort by date (newest first)
    return blogPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  loading = computed(() => {
    const files = this.contentFiles;
    return !Array.isArray(files) || files.length === 0;
  });
}
