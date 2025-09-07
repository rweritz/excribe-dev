import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  template: `
    <nav class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <a routerLink="/" class="text-xl font-bold text-gray-900">
              Your Name
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <a routerLink="/" class="text-gray-700 hover:text-gray-900">Home</a>
            <a routerLink="/about" class="text-gray-700 hover:text-gray-900"
              >About</a
            >
            <a routerLink="/projects" class="text-gray-700 hover:text-gray-900"
              >Projects</a
            >
            <a routerLink="/blog" class="text-gray-700 hover:text-gray-900"
              >Blog</a
            >
            <a routerLink="/contact" class="text-gray-700 hover:text-gray-900"
              >Contact</a
            >
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center">
            <button
              (click)="toggleMobileMenu()"
              class="text-gray-700 hover:text-gray-900"
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
            <a
              routerLink="/"
              class="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >Home</a
            >
            <a
              routerLink="/about"
              class="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >About</a
            >
            <a
              routerLink="/projects"
              class="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >Projects</a
            >
            <a
              routerLink="/blog"
              class="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >Blog</a
            >
            <a
              routerLink="/contact"
              class="block px-3 py-2 text-gray-700 hover:text-gray-900"
              >Contact</a
            >
          </div>
        </div>
      </div>
    </nav>
    <main class="min-h-screen bg-gray-50">
      <ng-content></ng-content>
    </main>
  `,
})
export class LayoutComponent {
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
