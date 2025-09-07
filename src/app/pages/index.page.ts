import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutComponent } from '../components/layout.component';
import { SITE_CONFIG } from '../config/navigation.config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutComponent, RouterLink],
  template: `
    <app-layout>
      <div
        class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      >
        <div class="max-w-4xl mx-auto text-center">
          <!-- Profile Image -->
          <div class="flex justify-center mb-8">
            <div class="relative">
              <div
                class="w-80 h-80 rounded-full overflow-hidden profile-image p-1"
              >
                <img
                  src="assets/about.jpg"
                  alt="{{ siteConfig.author }}"
                  class="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          <!-- Header Text -->
          <div class="mb-4">
            <p
              class="text-lg font-medium text-gray-300 tracking-widest uppercase"
            >
              {{ siteConfig.name }} | {{ siteConfig.handle }}
            </p>
          </div>

          <!-- Main Title -->
          <h1 class="text-5xl md:text-7xl font-bold text-white mb-4">
            Hey, I'm <span class="text-blue-400">{{ siteConfig.author }}</span>
          </h1>

          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">
            {{ siteConfig.tagline }}
          </h2>

          <!-- Description -->
          <p
            class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {{ siteConfig.description }}
          </p>

          <!-- Optional CTA Button -->
          <div class="mt-12">
            <a
              routerLink="/about"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Learn More About Me
            </a>
          </div>
        </div>
      </div>
    </app-layout>
  `,
})
export default class HomeComponent {
  siteConfig = SITE_CONFIG;
}
