import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../components/layout.component';
import { PageHeaderComponent } from '../components/page-header.component';
import { VideoCardComponent } from '../components/video-card.component';
import { VideoService } from '../services/video.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [
    LayoutComponent,
    CommonModule,
    PageHeaderComponent,
    VideoCardComponent,
  ],
  template: `
    <app-layout>
      <div class="min-h-screen px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12">
        <div class="max-w-7xl mx-auto">
          <app-page-header subtitle="VIDEOS" title="What I've Recorded" />

          @if (tags().length > 0) {
          <div class="mb-8 flex flex-wrap gap-2">
            <button
              (click)="selectTag(null)"
              [class]="
                selectedTag() === null
                  ? 'px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full font-medium'
                  : 'px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full font-medium hover:text-white transition-colors'
              "
            >
              All
            </button>
            @for (tag of tags(); track tag) {
            <button
              (click)="selectTag(tag)"
              [class]="
                selectedTag() === tag
                  ? 'px-3 py-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs rounded-full font-medium'
                  : 'px-3 py-1 bg-gray-800 text-gray-300 text-xs rounded-full font-medium hover:text-white transition-colors'
              "
            >
              {{ tag }}
            </button>
            }
          </div>
          }

          <!-- Video Grid -->
          <div
            class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
          >
            @for (video of filteredVideos(); track video.id) {
            <app-video-card [video]="video"></app-video-card>
            }
          </div>
        </div>
      </div>
    </app-layout>
  `,
})
export default class VideosComponent {
  private videoService = inject(VideoService);
  private seoService = inject(SeoService);
  videos = this.videoService.getVideos();
  selectedTag = signal<string | null>(null);

  tags = computed(() => {
    const tagSet = new Set<string>();

    this.videos.forEach((video) => {
      video.tags.forEach((tag) => tagSet.add(tag));
    });

    return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
  });

  filteredVideos = computed(() => {
    const selected = this.selectedTag();

    if (!selected) return this.videos;
    return this.videos.filter((video) => video.tags.includes(selected));
  });

  constructor() {
    this.seoService.updatePageTitle('Videos');
  }

  selectTag(tag: string | null) {
    this.selectedTag.set(tag);
  }
}
