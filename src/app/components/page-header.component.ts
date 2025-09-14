import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  standalone: true,
  template: `
    <div class="mb-12">
      @if (subtitle) {
      <h1
        class="text-lg font-medium text-blue-400 tracking-widest uppercase mb-4"
      >
        {{ subtitle }}
      </h1>
      }
      <h2 class="text-4xl md:text-5xl font-bold text-white">
        {{ title }}
      </h2>
    </div>
  `,
})
export class PageHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
