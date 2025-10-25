

"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, Bookmark, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Video } from '@/types/models/video';

interface VideoControlsProps {
  video: Video;
}

export default function VideoControls({ video }: VideoControlsProps) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(video.likeCount);
  
  // สลับสถานะ Like
  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  // สลับสถานะ Bookmark
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  // Format numbers to K, M format
  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* User Avatar */}
      <div className="flex flex-col items-center">
        <Avatar className="h-12 w-12 border-2 border-primary">
          <AvatarImage src={video.user?.avatar} alt={video.user?.displayName} />
          <AvatarFallback className="bg-primary text-foreground">
            {video.user?.displayName?.charAt(0) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="-translate-y-1/2 bg-primary text-xs text-foreground rounded-full w-5 h-5 flex items-center justify-center">
          +
        </div>
      </div>
      
      {/* Like Button */}
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-white/20 h-12 w-12"
          onClick={handleLike}
        >
          <Heart className={`size-6 ${liked ? 'fill-primary text-primary' : ''}`} />
        </Button>
        <span className="text-xs mt-1 text-white">{formatNumber(likeCount)}</span>
      </div>
      
      {/* Comment Button */}
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-white/20 h-12 w-12"
        >
          <MessageCircle className="size-6" />
        </Button>
        <span className="text-xs mt-1 text-white">{formatNumber(video.commentCount)}</span>
      </div>
      
      {/* Share Button */}
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-white/20 h-12 w-12"
        >
          <Share2 className="size-6" />
        </Button>
        <span className="text-xs mt-1 text-white">{formatNumber(video.viewCount)}</span>
      </div>
      
      {/* Bookmark Button */}
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-white/20 h-12 w-12"
          onClick={handleBookmark}
        >
          <Bookmark className={`size-6 ${bookmarked ? 'fill-primary text-primary' : ''}`} />
        </Button>
      </div>
      
      {/* More Options */}
      <div className="flex flex-col items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-white/20 h-12 w-12"
        >
          <MoreVertical className="size-6" />
        </Button>
      </div>
    </div>
  );
}