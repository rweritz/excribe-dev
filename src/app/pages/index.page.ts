import { Component } from '@angular/core';
import { LayoutComponent } from '../components/layout.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LayoutComponent],
  template: `
    <app-layout>
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="text-4xl font-bold text-gray-900 sm:text-6xl">
            Hi, I'm <span class="text-blue-600">Your Name</span>
          </h1>
          <p class="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
            Full-stack developer passionate about creating amazing web
            experiences with modern technologies like Angular, TypeScript, and
            Node.js.
          </p>
          <div class="mt-10">
            <a
              routerLink="/projects"
              class="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-700"
            >
              View My Work
            </a>
          </div>
        </div>
      </div>
    </app-layout>
  `,
})
export default class HomeComponent {}
