import { Injectable } from '@angular/core';
import { VideoItem } from '../types/common.types';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  private videos: VideoItem[] = [
    {
      id: 'backstage',
      title: 'HOW TO RUN Backstage LOCALLY AND CREATE A NEW SERVICE TEMPLATE',
      description:
        'Learn how to set up and run Backstage locally while creating custom service templates',
      thumbnail: 'backstage-dotnet-template.png',
      tags: ['.NET'],
      author: 'Rüdiger Weritz',
      authorHandle: '@rweritz',
      url: 'https://www.youtube.com/watch?v=VIzrTpOHh9w',
      hoverTitle:
        'How to run Backstage locally and create a new service template',
      hoverDescription:
        'Learn the fundamentals of Backstage development and service template creation for modern software development workflows.',
    },
    {
      id: 'docker',
      title: 'HOW TO CREATE A SMALL AND SECURE .NET WEB API IMAGE',
      description:
        'Build optimized and secure Docker images for .NET applications',
      thumbnail: 'secure-dotnet-docker.png',
      tags: ['.NET'],
      author: 'Rüdiger Weritz',
      authorHandle: '@rweritz',
      url: 'https://www.youtube.com/watch?v=jHGv6joW2wQ',
      hoverTitle:
        'How to create a small and secure .NET 6 Web API docker image',
      hoverDescription: 'dotnet | docker | trivy',
    },
    {
      id: 'distributed',
      title: 'HOW TO USE A DISTRIBUTED LOCK IN A .NET APPLICATION',
      description:
        'Implement distributed locking mechanisms in .NET applications',
      thumbnail: 'distributed-lock.png',
      tags: ['.NET'],
      author: 'Rüdiger Weritz',
      authorHandle: '@rweritz',
      url: 'https://www.youtube.com/watch?v=5YtAUk7k9bY',
      hoverTitle: 'How to use a distributed lock in a .NET application',
      hoverDescription:
        'Master distributed systems patterns and implementation techniques for scalable applications.',
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
