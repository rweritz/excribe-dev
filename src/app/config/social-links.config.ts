export interface SocialLinkData {
  icon: string;
  text: string;
  url: string;
  linkClass?: string;
}

export const SOCIAL_LINKS: SocialLinkData[] = [
  {
    icon: 'linkedin',
    text: 'LinkedIn',
    url: 'https://linkedin.com/in/rweritz',
  },
  {
    icon: 'github',
    text: 'GitHub',
    url: 'https://github.com/rweritz',
  },
  {
    icon: 'youtube',
    text: 'YouTube',
    url: 'https://youtube.com/@rweritz',
    linkClass: 'text-gray-300 hover:text-red-400 transition-colors',
  },
  {
    icon: 'x',
    text: '@RWERITZ',
    url: 'https://x.com/rweritz',
  },
];
