// src/app/pages/blog/[slug].page.ts
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

// Blog post interface matching the frontmatter structure
export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

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
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
          ></div>
          <p class="mt-4 text-gray-600">Loading post...</p>
        </div>
        } @if (error()) {
        <div class="text-center py-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">
            Error Loading Post
          </h1>
          <p class="text-red-600 mb-4">{{ error() }}</p>
        </div>
        } @if (!loading() && !error() && !post()) {
        <div class="text-center py-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p class="text-gray-600">
            The blog post you're looking for doesn't exist.
          </p>
        </div>
        } @if (!loading() && !error() && post()) {
        <article class="bg-white rounded-lg shadow-sm border p-8">
          <header class="mb-8">
            <div class="flex items-center justify-between mb-4">
              <time class="text-sm text-gray-500">{{
                post()!.attributes.date
              }}</time>
              <div class="flex space-x-2">
                @for (tag of post()!.attributes.tags; track tag) {
                <span
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {{ tag }}
                </span>
                }
              </div>
            </div>
            <h1 class="text-4xl font-bold text-gray-900 mb-4">
              {{ post()!.attributes.title }}
            </h1>
          </header>

          <div class="prose lg:prose-xl max-w-none">
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
