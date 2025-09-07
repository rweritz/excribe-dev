import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationItem } from '../config/navigation.config';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    @for (item of items; track item.route) {
    <a [routerLink]="item.route" [class]="linkClass">
      {{ item.label }}
    </a>
    }
  `,
})
export class NavigationComponent {
  @Input() items: NavigationItem[] = [];
  @Input() linkClass = 'text-gray-300 hover:text-white transition-colors';
}
