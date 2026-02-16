import { Component, inject, signal, computed } from '@angular/core';
import { LayoutComponent } from '../../components/layout.component';
import { PageHeaderComponent } from '../../components/page-header.component';
import { BlogCardComponent } from '../../components/blog-card.component';
import { injectContentFiles, ContentFile } from '@analogjs/content';
import { BlogPost } from '../../types/common.types';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [LayoutComponent, PageHeaderComponent, BlogCardComponent],
  template: `
    <app-layout>
        <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <app-page-header subtitle="Blog" title="What I've Written" />

          @if (loading()) {
        <div class="text-center py-8">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"
          ></div>
          <p class="mt-4 text-gray-300">Loading posts...</p>
        </div>
        } @if (!loading() && posts().length === 0) {
        <div class="text-center py-12">
          <div
            class="bg-gray-800 bg-opacity-60 backdrop-blur-sm border border-gray-700 rounded-lg p-8"
          >
            <svg
              class="w-16 h-16 text-gray-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              ></path>
            </svg>
            <h3 class="text-xl font-semibold text-white mb-2">
              No Blog Posts Yet
            </h3>
            <p class="text-gray-300">Check back soon for new content!</p>
          </div>
          </div>
          }

        @if (!loading() && tags().length > 0) {
        <div class="mb-8 flex flex-wrap gap-2">
          <button
            (click)="selectTag(null)"
            [class]="
              selectedTag() === null
                ? 'px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full font-medium'
                : 'px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full font-medium hover:text-white transition-colors'
            "
          >
            All
          </button>
          @for (tag of tags(); track tag) {
          <button
            (click)="selectTag(tag)"
            [class]="
              selectedTag() === tag
                ? 'px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full font-medium'
                : 'px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full font-medium hover:text-white transition-colors'
            "
          >
            {{ tag }}
          </button>
          }
        </div>
        }

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          @for (post of filteredPosts(); track post.slug) {
          <app-blog-card [post]="post"></app-blog-card>
          }
        </div>

        @if (!loading() && posts().length > 0 && filteredPosts().length === 0) {
        <p class="text-center text-gray-300 mt-8">
          No posts match this tag yet.
        </p>
        }
      </div>
    </app-layout>
  `,
})
export default class BlogComponent {
  private seoService = inject(SeoService);
  // Use injectContentFiles to load all blog posts from content/blog directory
  private contentFiles = injectContentFiles<BlogPost>();
  selectedTag = signal<string | null>(null);

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

  tags = computed(() => {
    const tagSet = new Set<string>();

    this.posts().forEach((post) => {
      post.tags.forEach((tag) => tagSet.add(tag));
    });

    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  });

  filteredPosts = computed(() => {
    const selected = this.selectedTag();
    const posts = this.posts();

    if (!selected) return posts;
    return posts.filter((post) => post.tags.includes(selected));
  });

  loading = computed(() => {
    const files = this.contentFiles;
    return !Array.isArray(files) || files.length === 0;
  });

  constructor() {
    this.seoService.updatePageTitle('Blog');
  }

  selectTag(tag: string | null) {
    this.selectedTag.set(tag);
  }
}
