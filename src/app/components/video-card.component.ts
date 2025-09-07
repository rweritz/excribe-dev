import { Component, Input, inject } from '@angular/core';
import { VideoItem } from '../types/common.types';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-video-card',
  standalone: true,
  template: `
    <div
      class="video-card group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] shadow-2xl w-full"
      (click)="onVideoClick()"
    >
      <!-- Thumbnail Background -->
      <div class="absolute inset-0">
        <img
          [src]="'assets/videos/' + video.thumbnail"
          [alt]="video.title"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Content Container -->
      <div class="relative z-10 h-64 md:h-80">
        <!-- No overlay content in normal state -->
      </div>

      <!-- Hover Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-700/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex items-center justify-center"
      >
        <div class="text-center text-white p-6 max-w-sm">
          <h4 class="text-2xl font-bold mb-4 leading-tight">
            {{ video.hoverTitle || video.title }}
          </h4>
          <p class="text-base mb-6 opacity-90 leading-relaxed">
            {{ video.hoverDescription || video.description }}
          </p>
          <button
            class="bg-white/20 border border-white/30 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
          >
            More Info
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .video-card {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        aspect-ratio: 16/9;
        min-height: 256px;
      }

      .video-card:hover {
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      }

      @media (min-width: 768px) {
        .video-card {
          min-height: 320px;
        }
      }

      .video-card img {
        transition: transform 0.3s ease;
      }

      @media (max-width: 767px) {
        .video-card img {
          object-fit: contain !important;
          background-color: rgba(0, 0, 0, 0.1);
        }
      }
    `,
  ],
})
export class VideoCardComponent {
  @Input({ required: true }) video!: VideoItem;

  private videoService = inject(VideoService);

  onVideoClick(): void {
    this.videoService.openVideo(this.video.url);
  }
}
