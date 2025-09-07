import { Component, inject, signal, computed, effect } from '@angular/core';
import { LayoutComponent } from '../../components/layout.component';
import { PageHeaderComponent } from '../../components/page-header.component';
import { BlogCardComponent } from '../../components/blog-card.component';
import { injectContentFiles, ContentFile } from '@analogjs/content';
import { BlogPost } from '../../types/common.types';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [LayoutComponent, PageHeaderComponent, BlogCardComponent],
  template: `
    <app-layout>
      <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <app-page-header
          title="Blog"
          description="Thoughts, tutorials, and insights on web development"
        >
        </app-page-header>

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
          <app-blog-card [post]="post"></app-blog-card>
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
