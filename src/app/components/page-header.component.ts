import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <div class="mb-12">
      @if (subtitle) {
      <h1
        class="text-lg font-medium text-gray-300 tracking-widest uppercase mb-4"
      >
        {{ subtitle }}
      </h1>
      }
      <h2 class="text-4xl md:text-5xl font-bold text-white">
        {{ title }}
      </h2>
      @if (description) {
      <p
        class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-4"
      >
        {{ description }}
      </p>
      }
    </div>
  `,
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() description = '';
}
