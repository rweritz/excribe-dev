// Example usage of the SocialLinkComponent in other components

// 1. Basic usage with icon-only links (recommended for icon grids):
/*
<app-social-link
  icon="x"
  url="https://x.com/rweritz"
  [iconSize]="'w-8 h-8'"
></app-social-link>
*/

// 2. Usage with custom icon size for larger displays:
/*
<app-social-link
  icon="youtube"
  url="https://youtube.com/@rweritz"
  [iconSize]="'w-12 h-12'"
></app-social-link>
*/

// 3. Usage with the shared configuration (recommended):
/*
import { SOCIAL_LINKS } from '../config/social-links.config';

@Component({
  // ... component config
  imports: [CommonModule, SocialLinkComponent],
  template: `
    <div class="flex justify-center space-x-6">
      <app-social-link
        *ngFor="let social of socialLinks"
        [icon]="social.icon"
        [url]="social.url"
        [iconSize]="'w-10 h-10'"
      ></app-social-link>
    </div>
  `
})
export class YourComponent {
  socialLinks = SOCIAL_LINKS;
}
*/

// 4. Available icons in the component:
// - x (gray) - X (formerly Twitter)
// - twitter (blue) - Legacy Twitter (kept for backwards compatibility)
// - github (blue)
// - linkedin (blue)
// - youtube (red)
// - email (green)
// - website (purple)
// - instagram (pink)
// - discord (indigo)
// - default (gray) - fallback for unknown icons

// 5. Different icon sizes available:
// - Small: 'w-4 h-4' or 'w-5 h-5'
// - Medium: 'w-6 h-6' or 'w-8 h-8' (default: 'w-6 h-6')
// - Large: 'w-10 h-10' or 'w-12 h-12'
// - Extra Large: 'w-16 h-16' or 'w-20 h-20'

// 6. Adding new social platforms to the configuration:
/*
export const SOCIAL_LINKS: SocialLinkData[] = [
  // ... existing links
  {
    icon: 'instagram',
    text: 'Instagram', // Note: text is now optional and not displayed in icon-only mode
    url: 'https://instagram.com/username',
  },
  {
    icon: 'discord',
    text: 'Discord', // Note: text is now optional and not displayed in icon-only mode
    url: 'https://discord.gg/server',
  }
];
*/
