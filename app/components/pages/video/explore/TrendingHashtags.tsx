// File: app/video/explore/components/TrendingHashtags.tsx
import React from 'react';
import Link from 'next/link';

// Mock trending hashtags
const trendingHashtags = [
  { tag: "สงกรานต์", count: "11.2B" },
  { tag: "เพลงใหม่", count: "8.7B" },
  { tag: "กระแสฮิต", count: "6.5B" },
  { tag: "ทริปเที่ยว", count: "5.9B" },
  { tag: "วิวสวย", count: "4.3B" },
  { tag: "อาหารอร่อย", count: "3.8B" }
];

interface TrendingHashtagsProps {
  isMobile: boolean;
}

export function TrendingHashtags({ isMobile }: TrendingHashtagsProps) {
  // For mobile, only show first 3 hashtags
  const displayHashtags = isMobile ? trendingHashtags.slice(0, 3) : trendingHashtags;

  if (isMobile) {
    return (
      <div className="py-3 px-4">
        <h2 className="text-xl font-bold mb-3">แฮชแท็กยอดนิยม</h2>
        <div className="space-y-2">
          {displayHashtags.map((hashtag, index) => (
            <Link 
              href={`/tag/${hashtag.tag}`} 
              key={index}
              className="block bg-card hover:bg-card/80 rounded-lg p-4 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">#{hashtag.tag}</p>
                  <p className="font-bold text-lg">{hashtag.count} views</p>
                </div>
                <span className="text-muted-foreground text-xs">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Desktop view
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">แฮชแท็กยอดนิยม</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {displayHashtags.map((hashtag, index) => (
          <Link 
            href={`/tag/${hashtag.tag}`} 
            key={index}
            className="bg-card hover:bg-card/80 border border-border rounded-xl p-4 transition-colors"
          >
            <p className="text-sm text-muted-foreground">#{hashtag.tag}</p>
            <p className="font-bold text-lg">{hashtag.count} views</p>
          </Link>
        ))}
      </div>
    </div>
  );
}