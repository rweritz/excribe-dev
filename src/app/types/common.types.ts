export interface VideoItem {
  id: string;
  thumbnail: string;
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
