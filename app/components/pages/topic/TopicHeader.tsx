// components/pages/topic/TopicHeader.tsx
"use client"

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import { ChevronRight, Eye, MessageSquare, Pin, Lock, Clock, User } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
// import { cn } from '@/lib/utils'; // Commented out unused import
import type { Topic } from '@/types/models/topic';

interface TopicHeaderProps {
  topic: Topic;
}

export function TopicHeader({ topic }: TopicHeaderProps) {
  const formatViewCount = (count: number): string => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <div className="space-y-4">
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
              href={`/forum/${topic.forumId}`}
              className="hover:text-foreground transition-colors"
            >
              {topic.forum.name}
            </Link>
          </>
        )}
        <ChevronRight size={16} />
        <span className="text-foreground">กระทู้</span>
      </nav>

      {/* Topic Header */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="space-y-4">
          {/* Topic Title & Status */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <h1 className="text-2xl font-bold text-foreground flex-1 leading-tight">
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

          {/* Author & Meta Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Author */}
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={topic.user?.avatar || undefined}
                    alt={topic.user?.displayName || topic.user?.username || 'User'}
                  />
                  <AvatarFallback>
                    <User size={16} />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">
                    {topic.user ?
                      (topic.user.displayName || `${topic.user.firstName} ${topic.user.lastName}`.trim() || topic.user.username || 'ผู้ใช้ไม่ระบุชื่อ')
                      : 'ผู้ใช้ไม่ระบุชื่อ'
                    }
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground">
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

            {/* Stats */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Eye size={16} />
                <span>{formatViewCount(topic.viewCount)} ครั้ง</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare size={16} />
                <span>{topic.replyCount} ตอบกลับ</span>
              </div>
            </div>
          </div>

          {/* Forum Info */}
          {topic.forum && (
            <div className="pt-3 border-t border-border">
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-2">อยู่ในหมวด:</span>
                <Link
                  href={`/forum/${topic.forumId}`}
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
      </div>
    </div>
  );
}