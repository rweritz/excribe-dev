import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NAVIGATION_ITEMS, SITE_CONFIG } from '../config/navigation.config';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <nav
      class="bg-gray-800 bg-opacity-80 backdrop-blur-sm border-b border-gray-700"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a
              routerLink="/"
              class="flex items-center space-x-2 text-xl font-bold text-white"
            >
              <img src="/assets/xc.png" alt="Excribe Logo" class="h-8 w-8" />
              <span>{{ siteConfig.name }}</span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <!-- Temporary direct navigation for testing -->
            <a
              routerLink="/"
              class="text-gray-300 hover:text-white transition-colors"
              >Home</a
            >
            <a
              href="#about"
              class="text-gray-300 hover:text-white transition-colors"
              >About</a
            >
            <a
              routerLink="/videos"
              class="text-gray-300 hover:text-white transition-colors"
              >Videos</a
            >
            <a
              routerLink="/blog"
              class="text-gray-300 hover:text-white transition-colors"
              >Blog</a
            >
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button
              (click)="toggleMobileMenu()"
              class="text-gray-300 hover:text-white"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div [class.hidden]="!mobileMenuOpen" class="md:hidden">
          <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <!-- Temporary direct navigation for testing -->
            <a
              routerLink="/"
              class="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              >Home</a
            >
            <a
              href="#about"
              class="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              (click)="closeMobileMenu()"
              >About</a
            >
            <a
              routerLink="/videos"
              class="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              >Videos</a
            >
            <a
              routerLink="/blog"
              class="block px-3 py-2 text-gray-300 hover:text-white transition-colors"
              >Blog</a
            >
          </div>
        </div>
      </div>
    </nav>
    <main class="min-h-screen gradient-bg">
      <ng-content></ng-content>
    </main>
  `,
})
export class LayoutComponent {
  navigationItems = NAVIGATION_ITEMS;
  siteConfig = SITE_CONFIG;
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
