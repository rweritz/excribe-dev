export interface VideoItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string[];
  author: string;
  authorHandle: string;
  url: string;
  hoverTitle?: string;
  hoverDescription?: string;
}

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
}
