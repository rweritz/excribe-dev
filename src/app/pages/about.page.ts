import { Component } from '@angular/core';
import { LayoutComponent } from '../components/layout.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [LayoutComponent],
  template: `
    <app-layout>
      <div class="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">About Me</h1>
        <div class="prose lg:prose-xl">
          <p>
            I'm a passionate full-stack developer with expertise in modern web
            technologies. I love building scalable applications and sharing my
            knowledge through blogging.
          </p>
          <h2>Skills</h2>
          <ul>
            <li>Angular & TypeScript</li>
            <li>Node.js & Express</li>
            <li>React & Next.js</li>
            <li>Python & Django</li>
            <li>AWS & Docker</li>
          </ul>
        </div>
      </div>
    </app-layout>
  `,
})
export default class AboutComponent {}
