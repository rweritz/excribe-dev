import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../components/layout.component';
import { SocialLinkComponent } from '../components/social-link.component';
import { SITE_CONFIG } from '../config/navigation.config';
import { SOCIAL_LINKS } from '../config/social-links.config';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, LayoutComponent, SocialLinkComponent],
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

          <!-- Connect With Me Section -->
          <div class="mt-12">
            <div
              class="bg-gray-800 bg-opacity-50 rounded-lg p-8 max-w-md mx-auto"
            >
              <h3
                class="text-2xl md:text-3xl font-bold text-white mb-6 text-center"
              >
                Connect With Me
              </h3>
              <div class="flex justify-center space-x-6">
                <app-social-link
                  *ngFor="let social of socialLinks"
                  [icon]="social.icon"
                  [url]="social.url"
                  [iconSize]="'w-12 h-12'"
                ></app-social-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </app-layout>
  `,
})
export default class HomeComponent {
  siteConfig = SITE_CONFIG;
  socialLinks = SOCIAL_LINKS;
}
