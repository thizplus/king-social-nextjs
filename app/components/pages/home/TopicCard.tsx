// components/TopicCard.tsx
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { Heart, MessageSquare, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTopicLike } from '@/hooks/useLike';

interface Author {
  id: string;
  name: string;
  image?: string;
  verified?: boolean;
}

interface TopicCardProps {
  id: string;
  title: string;
  author: Author;
  tags: string[];
  timestamp: string;
  views: number;
  likes?: number; // Optional, will use API data if available
  comments: number;
  thumbnailUrl: string;
  isSaved?: boolean;
  isLiked?: boolean; // Optional, will use API data if available
  className?: string;
  onSave?: (id: string) => void;
  onLike?: (id: string) => void;
  useLiveData?: boolean; // Use live like data from API
}

export function TopicCard({
  id,
  title,
  author,
  tags,
  timestamp,
  views,
  likes: propLikes,
  comments,
  thumbnailUrl,
  isSaved = false,
  isLiked: propIsLiked = false,
  className,
  onSave,
  useLiveData = true,
}: TopicCardProps) {
  // Use like hook for live data or fallback to props
  const {
    isLiked: liveIsLiked,
    likeCount: liveLikeCount,
    isToggling,
    toggleLike,
  } = useTopicLike(id, { autoFetch: useLiveData });

  // Use live data if available, otherwise use props
  const isLiked = useLiveData ? liveIsLiked : propIsLiked;
  const likes = useLiveData ? liveLikeCount : (propLikes || 0);

  // Like handler
  const handleLike = async () => {
    if (!useLiveData || isToggling) return;
    await toggleLike(id);
  };
  // Format views, likes and comments for display
  const formatNumber = (num: number | undefined): string => {
    if (!num || typeof num !== 'number') return '0';
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };
  
  const formattedViews = formatNumber(views);
  const formattedLikes = formatNumber(likes);
  const formattedComments = formatNumber(comments);
  
  return (
    <div className={cn("flex flex-col bg-card rounded-lg overflow-hidden shadow-sm border border-border/30", className)}>
      <div className="flex p-4 pb-3 gap-4">
        {/* Thumbnail */}
        <div className="flex-shrink-0 w-36 sm:w-40">
          <Link href={`/topic/${id}`}>
            <div className="relative aspect-[4/3] rounded-md overflow-hidden bg-muted">
              <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          </Link>
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <Link href={`/topic/${id}`} className="group">
            <h3 className="font-medium text-foreground line-clamp-2 text-lg group-hover:text-primary">
              {title}
            </h3>
          </Link>
          
          {/* Tags */}
          <div className="mt-1 flex flex-wrap gap-1.5">
            {tags.map((tag, index) => (
              <Link href={`/tag/${tag}`} key={index}>
                <Badge variant="secondary" className="text-xs font-normal">
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
          
          {/* Stats */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{formattedViews} </span>
              <button
                className={cn(
                  "flex items-center transition-colors",
                  useLiveData ? "hover:text-primary cursor-pointer" : "cursor-default",
                  isToggling && "opacity-50 cursor-not-allowed",
                  isLiked && "text-primary"
                )}
                onClick={handleLike}
                disabled={isToggling || !useLiveData}
              >
                <Heart
                  size={16}
                  className={cn("mr-1", isLiked && "fill-current")}
                />
                {formattedLikes}
              </button>
              <span className="flex items-center">
                <MessageSquare size={16} className="mr-1" />
                {formattedComments}
              </span>
            </div>
            
            {/* Save Button */}
            <button
              onClick={() => onSave?.(id)}
              className={cn(
                "p-1 rounded-full",
                isSaved ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Bookmark
                size={20}
                className={cn(isSaved && "fill-primary")}
              />
            </button>
          </div>
        </div>
      </div>
      
      {/* Author */}
      <div className="px-4 py-2 border-t border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7">
            {author.image ? (
              <AvatarImage src={author.image} alt={author.name} />
            ) : (
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center">
              <span className="text-sm font-medium">{author.name}</span>
              {author.verified && (
                <span className="ml-1 text-blue-500">•</span>
              )}
            </div>
            <span className="text-xs text-muted-foreground">{timestamp}</span>
          </div>
        </div>
      </div>
    </div>
  );
}