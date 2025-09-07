import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../types/common.types';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <article class="card hover:shadow-md transition-shadow">
      <div class="flex items-center justify-between mb-4">
        <time class="text-sm text-gray-500">{{ post.date }}</time>
        <div class="flex space-x-2">
          @for (tag of post.tags; track tag) {
          <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
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
        class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
      >
        Read more
        <svg
          class="ml-2 w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </a>
    </article>
  `,
})
export class BlogCardComponent {
  @Input({ required: true }) post!: BlogPost;
}
