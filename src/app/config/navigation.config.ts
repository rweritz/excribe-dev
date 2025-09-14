export interface NavigationItem {
  label: string;
  route: string;
  icon?: string;
  isAnchor?: boolean;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Home', route: '/' },
  { label: 'Videos', route: '/videos' },
  { label: 'Blog', route: '/blog' },
];

export const SITE_CONFIG = {
  name: 'EXCRIBE.DEV',
  author: 'Rüdiger',
  handle: '@RWERITZ',
  tagline: 'A Tech Enthusiast',
  description:
    'Enjoying to solve problems and create smart solutions together with others',
} as const;
