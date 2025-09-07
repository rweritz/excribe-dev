import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../components/layout.component';
import { PageHeaderComponent } from '../components/page-header.component';
import { VideoCardComponent } from '../components/video-card.component';
import { VideoService } from '../services/video.service';

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
      <div class="min-h-screen px-4 sm:px-6 lg:px-8 py-12">
        <div class="max-w-7xl mx-auto">
          <app-page-header subtitle="VIDEOS" title="What I've Created">
          </app-page-header>

          <!-- Video Grid -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            @for (video of videos; track video.id) {
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
  videos = this.videoService.getVideos();
}
