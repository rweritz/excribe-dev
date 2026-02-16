import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);
  private readonly siteName = 'eXcribe.DEV';
  private readonly siteHandle = '@rweritz';

  formatTitle(pageTitle: string): string {
    return `${this.siteName} | ${pageTitle} | ${this.siteHandle}`;
  }

  updatePageTitle(pageTitle: string) {
    this.title.setTitle(this.formatTitle(pageTitle));
  }

  updateTitle(title: string) {
    this.title.setTitle(title);
  }

  updateMetaTags(data: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
  }) {
    if (data.title) {
      this.title.setTitle(data.title);
      this.meta.updateTag({ property: 'og:title', content: data.title });
      this.meta.updateTag({ name: 'twitter:title', content: data.title });
    }

    if (data.description) {
      this.meta.updateTag({ name: 'description', content: data.description });
      this.meta.updateTag({
        property: 'og:description',
        content: data.description,
      });
      this.meta.updateTag({
        name: 'twitter:description',
        content: data.description,
      });
    }

    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    if (data.image) {
      this.meta.updateTag({ property: 'og:image', content: data.image });
      this.meta.updateTag({ name: 'twitter:image', content: data.image });
    }
  }
}
