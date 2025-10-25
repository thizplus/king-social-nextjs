// components/ThreadCard.tsx
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ThreadCardProps {
  id: string;
  title: string;
  author: string;
  authorId: string;
  categories: string[];
  timestamp: string;
  commentCount: number;
  thumbnailUrl?: string;
  isAd?: boolean;
  isHot?: boolean;
  isCr?: boolean;
  className?: string;
}

export function ThreadCard({
  id,
  title,
  author,
  authorId,
  categories,
  timestamp,
  commentCount,
  thumbnailUrl,
  isAd = false,
  isHot = false,
  isCr = false,
  className,
}: ThreadCardProps) {
  // Format categories for display
  const formattedCategories = categories.join(' › ');
  
  return (
    <div className={cn("flex gap-3 py-4 border-b border-border", className)}>
      {/* Thumbnail */}
      {thumbnailUrl && (
        <div className="flex-shrink-0">
          <Link href={`/topic/${id}`}>
            <div className="relative h-20 w-20 overflow-hidden rounded-md">
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        </div>
      )}
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <div className="flex items-start gap-2">
          {isHot && (
            <span className="flex-shrink-0 text-amber-500">🔥</span>
          )}
          
          {isCr && (
            <span className="flex-shrink-0 text-amber-500">🎬</span>
          )}
          
          <Link href={`/topic/${id}`} className="group">
            <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary">
              {isAd && <Badge variant="outline" className="mr-1 bg-primary/10 text-primary text-xs">Ad</Badge>}
              {title}
            </h3>
          </Link>
        </div>
        
        {/* Meta */}
        <div className="mt-1 text-xs text-muted-foreground line-clamp-1">
          <Link href={`/user/${authorId}`} className="hover:text-primary hover:underline">
            {author}
          </Link>
          {categories.length > 0 && (
            <span> • {formattedCategories}</span>
          )}
          <span> • {timestamp}</span>
        </div>
        
        {/* Comment Count */}
        <div className="mt-2 flex items-center text-muted-foreground">
          <MessageSquare size={16} className="mr-1" />
          <span className="text-sm">{commentCount}</span>
        </div>
      </div>
    </div>
  );
}