// components/pages/topic/TopicDetail.tsx
"use client"

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import {
  ChevronRight,
  Eye,
  MessageSquare,
  Pin,
  Lock,
  Clock,
  User,
  Heart,
  Reply,
  Share2,
  Bookmark,
  MoreHorizontal
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useTopicLike } from '@/hooks/useLike';
import type { Topic } from '@/types/models/topic';

interface TopicDetailProps {
  topic: Topic;
  onReplyClick?: () => void;
}

export function TopicDetail({ topic, onReplyClick }: TopicDetailProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Use like hook with auto fetch
  const {
    isLiked,
    likeCount,
    isToggling,
    toggleLike,
    // error: likeError // Commented out unused variable
  } = useTopicLike(topic.id, { autoFetch: true });

console.log('useTopicLike', useTopicLike(topic.id, { autoFetch: true }));
console.log('isLiked', isLiked);
console.log('likeCount', likeCount);
console.log('isToggling', isToggling);
console.log('toggleLike', toggleLike);


  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const handleLike = async () => {
    if (isToggling) return; // Prevent multiple clicks
    await toggleLike(topic.id);
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

  // Get display name
  const displayName = topic.user ?
    (topic.user.displayName || `${topic.user.firstName} ${topic.user.lastName}`.trim() || topic.user.username || 'ผู้ใช้ไม่ระบุชื่อ')
    : 'ผู้ใช้ไม่ระบุชื่อ';

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
        <Link
          href="/"
          className="hover:text-foreground transition-colors"
        >
          หน้าแรก
        </Link>
        <ChevronRight size={16} />
        <Link
          href="/forum"
          className="hover:text-foreground transition-colors"
        >
          ฟอรัม
        </Link>
        {topic.forum && (
          <>
            <ChevronRight size={16} />
            <Link
              href={`/forum/${topic.forum.slug}`}
              className="hover:text-foreground transition-colors"
            >
              {topic.forum.name}
            </Link>
          </>
        )}
        <ChevronRight size={16} />
        <span className="text-foreground">กระทู้</span>
      </nav>

      {/* Main Topic Card */}
      <Card>
        <CardContent className="p-6">
          {/* Topic Header */}
          <div className="space-y-4 mb-6">
            {/* Title & Status */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <h1 className="text-3xl font-bold text-foreground flex-1 leading-tight">
                  {topic.title}
                </h1>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {topic.isPinned && (
                    <Badge variant="secondary" className="text-yellow-600">
                      <Pin size={12} className="mr-1" />
                      ปักหมุด
                    </Badge>
                  )}
                  {topic.isLocked && (
                    <Badge variant="destructive">
                      <Lock size={12} className="mr-1" />
                      ล็อค
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Meta Information */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {/* Author */}
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={topic.user?.avatar || undefined}
                      alt={displayName}
                    />
                    <AvatarFallback>
                      <User size={20} />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">
                      {displayName}
                    </p>
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
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Eye size={16} />
                    <span>{formatViewCount(topic.viewCount)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare size={16} />
                    <span>{topic.replyCount}</span>
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
            </div>

            {/* Forum Info */}
            {topic.forum && (
              <div className="pt-3 border-t border-border">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-2">อยู่ในหมวด:</span>
                  <Link
                    href={`/forum/${topic.forum.slug}`}
                    className="text-primary hover:underline font-medium"
                  >
                    {topic.forum.name}
                  </Link>
                  {topic.forum.description && (
                    <span className="ml-2 text-xs">
                      - {topic.forum.description}
                    </span>
                  )}
                </div>
              </div>
            )}
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
          <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none mb-6 ">
            <div
              dangerouslySetInnerHTML={{ __html: topic.content }}
              className="leading-relaxed space-y-4"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-border">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="default"
                onClick={handleLike}
                disabled={isToggling}
                className={cn(
                  "text-muted-foreground hover:text-foreground",
                  isLiked && "text-primary hover:text-primary",
                  isToggling && "opacity-50 cursor-not-allowed"
                )}
              >
                <Heart
                  size={18}
                  className={cn("", isLiked && "fill-current")}
                />
                {likeCount > 0 ? likeCount : "ถูกใจ"}
              </Button>

              <Button
                variant="ghost"
                size="default"
                onClick={onReplyClick}
                className="text-muted-foreground hover:text-foreground"
              >
                <Reply size={18} className="" />
                ตอบกลับ
              </Button>

              <Button
                variant="ghost"
                size="default"
                onClick={handleShare}
                className="text-muted-foreground hover:text-foreground"
              >
                <Share2 size={18} className="" />
                แชร์
              </Button>
            </div>

            <Button
              variant="ghost"
              size="default"
              onClick={handleBookmark}
              className={cn(
                "text-muted-foreground hover:text-foreground",
                isBookmarked && "text-yellow-500 hover:text-yellow-600"
              )}
            >
              <Bookmark
                size={18}
                className={cn(isBookmarked && "fill-current")}
              />
              {isBookmarked ? "บันทึกแล้ว" : "บันทึก"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}