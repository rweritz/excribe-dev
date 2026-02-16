import { Injectable } from '@angular/core';
import { VideoItem } from '../types/common.types';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private videos: VideoItem[] = [
    {
      id: 'backstage',
      thumbnail: 'backstage-dotnet-template.png',
      url: 'https://www.youtube.com/watch?v=VIzrTpOHh9w',
      hoverTitle:
        'How to run Backstage locally and create a new service template',
      hoverDescription: 'Backstage | dotnet | docker',
      tags: ['Backstage', 'dotnet', 'docker'],
    },
    {
      id: 'docker',
      thumbnail: 'secure-dotnet-docker.png',
      url: 'https://www.youtube.com/watch?v=jHGv6joW2wQ',
      hoverTitle:
        'How to create a small and secure .NET 6 Web API docker image',
      hoverDescription: 'dotnet | docker | trivy',
      tags: ['dotnet', 'docker', 'trivy'],
    },
    {
      id: 'distributed',
      thumbnail: 'distributed-lock.png',
      url: 'https://www.youtube.com/watch?v=5YtAUk7k9bY',
      hoverTitle: 'How to use a distributed lock in a .NET application',
      hoverDescription: 'dotnet | DistributedLock',
      tags: ['dotnet', 'DistributedLock'],
    },
  ];

  getVideos(): VideoItem[] {
    return this.videos;
  }

  getVideoById(id: string): VideoItem | undefined {
    return this.videos.find((video) => video.id === id);
  }

  openVideo(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
