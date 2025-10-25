// File: app/video/explore/components/VideoList.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';

// Mock trending videos
const trendingVideos = [
  {
    id: "1",
    thumbnail: "https://picsum.photos/300/400?random=1",
    views: "458.2K",
    user: {
      username: "liy_399",
      avatar: "https://i.pravatar.cc/150?img=1"
    }
  },
  {
    id: "2",
    thumbnail: "https://picsum.photos/300/400?random=2",
    views: "298.2K",
    user: {
      username: "bamngi",
      avatar: "https://i.pravatar.cc/150?img=2"
    }
  },
  {
    id: "3",
    thumbnail: "https://picsum.photos/300/400?random=3",
    views: "153.6K",
    user: {
      username: "chatphattha",
      avatar: "https://i.pravatar.cc/150?img=3"
    }
  },
  {
    id: "4",
    thumbnail: "https://picsum.photos/300/400?random=4",
    views: "291.3K",
    user: {
      username: "untzenyoutube",
      avatar: "https://i.pravatar.cc/150?img=4"
    }
  },
  {
    id: "5",
    thumbnail: "https://picsum.photos/300/400?random=5",
    views: "189.4K",
    user: {
      username: "user5",
      avatar: "https://i.pravatar.cc/150?img=5"
    }
  },
  {
    id: "6",
    thumbnail: "https://picsum.photos/300/400?random=6",
    views: "76.8K",
    user: {
      username: "user6",
      avatar: "https://i.pravatar.cc/150?img=6"
    }
  },
  {
    id: "7",
    thumbnail: "https://picsum.photos/300/400?random=7",
    views: "543.1K",
    user: {
      username: "user7",
      avatar: "https://i.pravatar.cc/150?img=7"
    }
  },
  {
    id: "8",
    thumbnail: "https://picsum.photos/300/400?random=8",
    views: "127.5K",
    user: {
      username: "user8",
      avatar: "https://i.pravatar.cc/150?img=8"
    }
  },
  {
    id: "9",
    thumbnail: "https://picsum.photos/300/400?random=9",
    views: "217.9K",
    user: {
      username: "user9",
      avatar: "https://i.pravatar.cc/150?img=9"
    }
  },
  {
    id: "10",
    thumbnail: "https://picsum.photos/300/400?random=10",
    views: "175.2K",
    user: {
      username: "user10",
      avatar: "https://i.pravatar.cc/150?img=10"
    }
  }
];

interface VideoListProps {
  isMobile: boolean;
}

export function VideoList({ isMobile }: VideoListProps) {
  if (isMobile) {
    return (
      <div className="mt-2 pb-20">
        {trendingVideos.map((video) => (
          <Link href={`/video/${video.id}`} key={video.id} className="relative block">
            <div className="aspect-video bg-card">
              <div className="relative h-full w-full">
                <Image
                  src={video.thumbnail}
                  alt={`Video by ${video.user.username}`}
                  fill
                  className="object-cover"
                />
                
                {/* Overlay with user info and stats */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-card/90 via-card/50 to-transparent">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <Image
                          src={video.user.avatar}
                          alt={video.user.username}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-foreground text-sm font-medium">{video.user.username}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 text-foreground mr-1 fill-primary" />
                      <span className="text-foreground text-sm">{video.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // Desktop view
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {trendingVideos.map((video) => (
          <Link href={`/video/${video.id}`} key={video.id} className="relative group">
            <div className="aspect-[3/4] bg-card rounded-lg overflow-hidden">
              <div className="relative h-full w-full">
                <Image
                  src={video.thumbnail}
                  alt={`Video by ${video.user.username}`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay with user info and stats */}
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-card/70 via-card/30 to-transparent">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full overflow-hidden">
                      <Image
                        src={video.user.avatar}
                        alt={video.user.username}
                        width={24}
                        height={24}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-foreground text-xs truncate">{video.user.username}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <Heart className="h-3.5 w-3.5 text-foreground mr-1" />
                    <span className="text-foreground text-xs">{video.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Load More Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-card hover:bg-card/80 text-foreground font-medium rounded-full px-6 py-2.5 transition-colors border border-border">
          โหลดเพิ่มเติม
        </button>
      </div>
    </div>
  );
}