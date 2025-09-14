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

          <!-- Optional CTA Button -->
          <div class="mt-12">
            <a
              href="#about"
              class="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl"
            >
              Learn More About Me
            </a>
          </div>
        </div>
      </div>

      <!-- About Section -->
      <div
        id="about"
        class="min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 bg-opacity-50"
      >
        <div class="max-w-4xl mx-auto">
          <h2
            class="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
          >
            About Me
          </h2>
          <div class="space-y-8">
            <p class="text-xl md:text-2xl text-gray-300 leading-relaxed">
              I'm a passionate full-stack developer with expertise in modern web
              technologies. I love building scalable applications and sharing my
              knowledge through blogging.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Skills Section -->
              <div class="bg-gray-800 bg-opacity-50 rounded-lg p-8">
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-6">
                  Skills
                </h3>
                <div class="grid grid-cols-1 gap-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span class="text-gray-300 text-lg"
                      >Angular & TypeScript</span
                    >
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span class="text-gray-300 text-lg">Node.js & Express</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span class="text-gray-300 text-lg">React & Next.js</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span class="text-gray-300 text-lg">Python & Django</span>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span class="text-gray-300 text-lg">AWS & Docker</span>
                  </div>
                </div>
              </div>

              <!-- Social Links Section -->
              <div class="bg-gray-800 bg-opacity-50 rounded-lg p-8">
                <h3 class="text-2xl md:text-3xl font-bold text-white mb-6">
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

            <!-- What I'm Up To Section -->
            <div class="bg-gray-800 bg-opacity-50 rounded-lg p-8">
              <h3 class="text-2xl md:text-3xl font-bold text-white mb-6">
                What I'm Up To
              </h3>
              <ul class="space-y-3 text-gray-300">
                <li class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-lg"
                    >Creating technical content and tutorials</span
                  >
                </li>
                <li class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-lg">Building modern web applications</span>
                </li>
                <li class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-lg"
                    >Exploring new technologies and frameworks</span
                  >
                </li>
                <li class="flex items-center space-x-3">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span class="text-lg"
                    >Contributing to open source projects</span
                  >
                </li>
              </ul>
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
