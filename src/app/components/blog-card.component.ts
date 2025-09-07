import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BlogPost } from '../types/common.types';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <article
      class="bg-gray-800 bg-opacity-60 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:bg-opacity-80 hover:border-gray-600 transition-all duration-300 group"
    >
      <div class="flex items-center justify-between mb-4">
        <time class="text-sm text-gray-400">{{ post.date }}</time>
        <div class="flex space-x-2">
          @for (tag of post.tags; track tag) {
          <span
            class="px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full font-medium"
          >
            {{ tag }}
          </span>
          }
        </div>
      </div>

      <h2
        class="text-2xl font-bold text-white mb-3 group-hover:text-gradient transition-all duration-300"
      >
        <a
          [routerLink]="['/blog', post.slug]"
          class="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-400 hover:to-blue-400"
        >
          {{ post.title }}
        </a>
      </h2>

      <p class="text-gray-300 mb-6 leading-relaxed">{{ post.excerpt }}</p>

      <a
        [routerLink]="['/blog', post.slug]"
        class="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors group-hover:translate-x-1 transform duration-300"
      >
        Read more
        <svg
          class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 duration-300"
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
