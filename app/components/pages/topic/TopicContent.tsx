// components/pages/topic/TopicContent.tsx
"use client"

import { useState } from 'react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import {
  Heart,
  // MessageSquare, // Commented out unused import
  Share2,
  Bookmark,
  MoreHorizontal,
  User,
  Clock,
  Reply
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { Topic } from '@/types/models/topic';

interface TopicContentProps {
  topic: Topic;
}

export function TopicContent({ topic }: TopicContentProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: topic.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Could show a toast notification here
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        {/* Author Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={topic.user?.avatar || undefined}
                alt={topic.user?.displayName || topic.user?.username || 'User'}
              />
              <AvatarFallback>
                <User size={20} />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-foreground">
                {topic.user ?
                  (topic.user.displayName || `${topic.user.firstName} ${topic.user.lastName}`.trim() || topic.user.username || 'ผู้ใช้ไม่ระบุชื่อ')
                  : 'ผู้ใช้ไม่ระบุชื่อ'
                }
              </h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={12} className="mr-1" />
                {topic.createdAt && new Date(topic.createdAt).getTime() ? (
                  formatDistanceToNow(new Date(topic.createdAt), {
                    addSuffix: true,
                    locale: th
                  })
                ) : (
                  'เมื่อไหร่ก็ได้'
                )}
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>รายงานเนื้อหา</DropdownMenuItem>
              <DropdownMenuItem>คัดลอกลิงก์</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Thumbnail */}
        {topic.thumbnail && (
          <div className="mb-6">
            <Image
              src={topic.thumbnail}
              alt={topic.title}
              width={800}
              height={256}
              className="w-full h-64 object-cover rounded-lg border border-border"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none mb-6">
          <div
            dangerouslySetInnerHTML={{ __html: topic.content }}
            className="leading-relaxed"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "text-muted-foreground hover:text-foreground",
                isLiked && "text-red-500 hover:text-red-600"
              )}
            >
              <Heart
                size={16}
                className={cn("mr-2", isLiked && "fill-current")}
              />
              {likeCount > 0 ? likeCount : "ถูกใจ"}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <Reply size={16} className="mr-2" />
              ตอบกลับ
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-muted-foreground hover:text-foreground"
            >
              <Share2 size={16} className="mr-2" />
              แชร์
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={cn(
              "text-muted-foreground hover:text-foreground",
              isBookmarked && "text-yellow-500 hover:text-yellow-600"
            )}
          >
            <Bookmark
              size={16}
              className={cn(isBookmarked && "fill-current")}
            />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}