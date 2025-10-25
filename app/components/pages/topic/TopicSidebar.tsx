// components/pages/topic/TopicSidebar.tsx
"use client"

import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import {
  Users,
  MessageSquare,
  TrendingUp,
  Calendar,
  User,
  Hash,
  // Clock, // Commented out unused import
  Eye
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge'; // Commented out unused import
import type { Topic } from '@/types/models/topic';

interface TopicSidebarProps {
  topic: Topic;
}

export function TopicSidebar({ topic }: TopicSidebarProps) {
  // Mock data for related topics and forum stats
  const relatedTopics = [
    {
      id: '1',
      title: 'วิธีการใช้ React Hooks อย่างมีประสิทธิภาพ',
      replyCount: 15,
      viewCount: 234,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      title: 'Next.js 14 App Router คืออะไร?',
      replyCount: 8,
      viewCount: 156,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      title: 'เทคนิคการ Debug JavaScript ที่ควรรู้',
      replyCount: 23,
      viewCount: 445,
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  const forumStats = {
    totalTopics: 156,
    totalMembers: 1234,
    todayActive: 45
  };

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
      {/* Topic Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">สถิติกระทู้</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Eye size={16} />
              <span>จำนวนการดู</span>
            </div>
            <span className="font-medium">{formatViewCount(topic.viewCount)}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MessageSquare size={16} />
              <span>จำนวนตอบกลับ</span>
            </div>
            <span className="font-medium">{topic.replyCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar size={16} />
              <span>สร้างเมื่อ</span>
            </div>
            <span className="font-medium text-xs">
              {topic.createdAt && new Date(topic.createdAt).getTime() ? (
                formatDistanceToNow(new Date(topic.createdAt), {
                  addSuffix: true,
                  locale: th
                })
              ) : (
                'เมื่อไหร่ก็ได้'
              )}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Author Info */}
      {topic.user && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">ผู้เขียน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={topic.user.avatar || undefined}
                  alt={topic.user.displayName || topic.user.username}
                />
                <AvatarFallback>
                  <User size={20} />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-medium">
                  {topic.user.displayName || `${topic.user.firstName} ${topic.user.lastName}`.trim() || topic.user.username || 'ผู้ใช้ไม่ระบุชื่อ'}
                </h3>
                <p className="text-sm text-muted-foreground">สมาชิก</p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border">
              <Link
                href={`/profile/${topic.userId}`}
                className="text-sm text-primary hover:underline"
              >
                ดูโปรไฟล์
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Forum Info */}
      {topic.forum && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">หมวดหมู่</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Link
                href={`/forum/${topic.forumId}`}
                className="font-medium text-primary hover:underline"
              >
                {topic.forum.name}
              </Link>
              {topic.forum.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {topic.forum.description}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
              <div className="text-center">
                <p className="text-sm font-medium">{forumStats.totalTopics}</p>
                <p className="text-xs text-muted-foreground">กระทู้</p>
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">{forumStats.totalMembers}</p>
                <p className="text-xs text-muted-foreground">สมาชิก</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Related Topics */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <TrendingUp size={18} />
            กระทู้ที่เกี่ยวข้อง
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {relatedTopics.map((relatedTopic) => (
              <Link
                key={relatedTopic.id}
                href={`/topic/${relatedTopic.id}`}
                className="block p-3 rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <h4 className="text-sm font-medium line-clamp-2 mb-2">
                  {relatedTopic.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Eye size={12} />
                      <span>{formatViewCount(relatedTopic.viewCount)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MessageSquare size={12} />
                      <span>{relatedTopic.replyCount}</span>
                    </span>
                  </div>
                  <span>
                    {relatedTopic.createdAt && new Date(relatedTopic.createdAt).getTime() ? (
                      formatDistanceToNow(new Date(relatedTopic.createdAt), {
                        locale: th
                      })
                    ) : (
                      'เมื่อไหร่ก็ได้'
                    )}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-border">
            <Link
              href={`/forum/${topic.forumId}`}
              className="text-sm text-primary hover:underline"
            >
              ดูกระทู้ทั้งหมดในหมวดนี้
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">การดำเนินการ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Link
            href={`/forum/${topic.forumId}`}
            className="flex items-center p-2 text-sm hover:bg-secondary/50 rounded-md transition-colors"
          >
            <Hash size={16} className="mr-2" />
            ดูหมวดหมู่นี้
          </Link>
          <Link
            href="/forum"
            className="flex items-center p-2 text-sm hover:bg-secondary/50 rounded-md transition-colors"
          >
            <Users size={16} className="mr-2" />
            ดูฟอรัมทั้งหมด
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}