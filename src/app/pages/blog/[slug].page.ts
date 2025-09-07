import {
  Component,
  OnInit,
  inject,
  Input,
  signal,
  computed,
  effect,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutComponent } from '../../components/layout.component';
import {
  MarkdownComponent,
  injectContent,
  ContentFile,
} from '@analogjs/content';
import { SeoService } from '../../services/seo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { BlogPost } from '../../types/common.types';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [LayoutComponent, MarkdownComponent],
  template: `
    <app-layout>
      <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        @if (loading()) {
        <div class="text-center py-8">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto"
          ></div>
          <p class="mt-4 text-gray-300">Loading post...</p>
        </div>
        } @if (error()) {
        <div class="text-center py-8">
          <div
            class="bg-gray-800 bg-opacity-60 backdrop-blur-sm border border-red-600 rounded-lg p-8"
          >
            <svg
              class="w-16 h-16 text-red-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
            <h1 class="text-2xl font-bold text-white mb-4">
              Error Loading Post
            </h1>
            <p class="text-red-400 mb-4">{{ error() }}</p>
          </div>
        </div>
        } @if (!loading() && !error() && !post()) {
        <div class="text-center py-8">
          <div
            class="bg-gray-800 bg-opacity-60 backdrop-blur-sm border border-gray-700 rounded-lg p-8"
          >
            <svg
              class="w-16 h-16 text-gray-400 mx-auto mb-4"
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
            <h1 class="text-2xl font-bold text-white mb-4">Post Not Found</h1>
            <p class="text-gray-300">
              The blog post you're looking for doesn't exist.
            </p>
          </div>
        </div>
        } @if (!loading() && !error() && post()) {
        <article
          class="bg-gray-800 bg-opacity-60 backdrop-blur-sm border border-gray-700 rounded-lg p-8"
        >
          <header class="mb-8">
            <div class="flex items-center justify-between mb-6">
              <time class="text-sm text-gray-400 font-medium">{{
                post()!.attributes.date
              }}</time>
              <div class="flex space-x-2">
                @for (tag of post()!.attributes.tags; track tag) {
                <span
                  class="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full font-medium"
                >
                  {{ tag }}
                </span>
                }
              </div>
            </div>
            <h1
              class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            >
              {{ post()!.attributes.title }}
            </h1>
            @if (post()!.attributes.excerpt) {
            <p class="text-xl text-gray-300 leading-relaxed">
              {{ post()!.attributes.excerpt }}
            </p>
            }
          </header>

          <div
            class="prose lg:prose-xl prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-strong:text-white prose-code:text-blue-300 prose-code:bg-gray-900 prose-code:px-1 prose-code:rounded prose-blockquote:border-l-blue-400 prose-blockquote:text-gray-300"
          >
            <analog-markdown [content]="post()!.content"></analog-markdown>
          </div>
        </article>
        }
      </div>
    </app-layout>
  `,
})
export default class BlogPostComponent implements OnInit {
  private seoService = inject(SeoService);
  private route = inject(ActivatedRoute);

  @Input() slug!: string;

  // Use injectContent to load blog posts from content/blog directory
  private contentObservable = injectContent<BlogPost>({
    param: 'slug',
    subdirectory: 'blog',
  });

  // Convert observable to signal
  private contentSignal = toSignal(this.contentObservable);

  post = computed(() => {
    const content = this.contentSignal();
    return content || null;
  });

  loading = signal(true);
  error = signal<string | null>(null);

  constructor() {
    // Use effect to handle content changes and update SEO
    effect(() => {
      const content = this.post();

      if (content) {
        // Update SEO
        this.seoService.updateMetaTags({
          title: `${content.attributes.title} - Your Portfolio`,
          description: content.attributes.excerpt,
          keywords: content.attributes.tags.join(', '),
        });
        this.error.set(null);
        this.loading.set(false);
      } else if (this.contentSignal() === undefined) {
        // Still loading
        this.loading.set(true);
        this.error.set(null);
      } else {
        // Content is null, post not found
        this.error.set('Blog post not found');
        this.loading.set(false);
      }
    });
  }

  ngOnInit() {
    // Handle route parameter changes
    this.route.paramMap.subscribe((params) => {
      const routeSlug = params.get('slug');
      if (routeSlug) {
        this.slug = routeSlug;
      }
    });
  }
}
