import { Component, Input, inject } from '@angular/core';
import { VideoItem } from '../types/common.types';
import { VideoService } from '../services/video.service';

@Component({
  selector: 'app-video-card',
  standalone: true,
  template: `
    <div
      class="video-card group relative overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] shadow-xl lg:shadow-2xl w-full"
      (click)="onVideoClick()"
    >
      <!-- Thumbnail Background -->
      <div class="absolute inset-0">
        <img
          [src]="'assets/videos/' + video.thumbnail"
          [alt]="video.hoverTitle"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Content Container -->
      <div class="relative z-10 h-40 sm:h-48 md:h-56 lg:h-64 xl:h-80">
        <!-- No overlay content in normal state -->
      </div>

      <!-- Hover Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-700/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 flex items-center justify-center"
      >
        <div
          class="text-center text-white p-3 sm:p-4 md:p-6 max-w-xs sm:max-w-sm"
        >
          <h4
            class="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3 lg:mb-4 leading-tight"
          >
            {{ video.hoverTitle }}
          </h4>
          <p
            class="text-sm sm:text-base mb-4 sm:mb-6 opacity-90 leading-relaxed"
          >
            {{ video.hoverDescription }}
          </p>
          <button
            class="bg-white/20 border border-white/30 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg text-sm sm:text-base font-medium hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
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
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
        aspect-ratio: 16/9;
      }

      .video-card:hover {
        box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
      }

      /* Responsive adjustments */
      @media (min-width: 640px) {
        .video-card {
          box-shadow: 0 15px 35px -8px rgba(0, 0, 0, 0.4);
        }
      }

      @media (min-width: 1024px) {
        .video-card {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .video-card:hover {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
        }
      }

      .video-card img {
        transition: transform 0.3s ease;
      }

      @media (max-width: 639px) {
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
