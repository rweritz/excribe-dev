import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '../../components/layout.component';
import { GitHubService, BlogPost } from '../../services/github.service';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink, LayoutComponent],
  template: `
    <app-layout>
      <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">Blog</h1>

        <div *ngIf="loading()" class="text-center py-8">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
          ></div>
          <p class="mt-4 text-gray-600">Loading posts...</p>
        </div>

        <div
          *ngIf="!loading() && posts().length === 0"
          class="text-center py-8"
        >
          <p class="text-gray-600">No blog posts found.</p>
        </div>

        <div class="space-y-8">
          <article
            *ngFor="let post of posts()"
            class="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow"
          >
            <div class="flex items-center justify-between mb-4">
              <time class="text-sm text-gray-500">{{ post.date }}</time>
              <div class="flex space-x-2">
                <span
                  *ngFor="let tag of post.tags"
                  class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
                >
                  {{ tag }}
                </span>
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
        </div>
      </div>
    </app-layout>
  `,
})
export default class BlogComponent implements OnInit {
  private githubService = inject(GitHubService);

  posts = signal<BlogPost[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.loadBlogPosts();
  }

  private loadBlogPosts() {
    this.githubService.getBlogPosts().subscribe((files) => {
      console.log('Files received:', files);
      if (files.length === 0) {
        this.loading.set(false);
        return;
      }

      // Fetch content for each markdown file
      const postObservables = files.map((file) =>
        this.githubService
          .getBlogPost(file.name)
          .pipe(
            map((content) =>
              content
                ? this.githubService.parseBlogPost(content, file.name)
                : null
            )
          )
      );

      forkJoin(postObservables).subscribe((posts) => {
        console.log('Posts processed:', posts);
        const validPosts = posts.filter((post) => post !== null) as BlogPost[];
        // Sort by date (newest first)
        validPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        this.posts.set(validPosts);
        this.loading.set(false);
        console.log('Final posts array:', validPosts);
      });
    });
  }
}
