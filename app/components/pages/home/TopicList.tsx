// components/pages/home/TopicList.tsx
"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { cn, formatTimestamp } from '@/lib/utils';
import { useTopic } from '@/hooks/useTopic';
import type { Topic } from '@/types/models/topic';

interface TopicListProps {
  title?: string;
  className?: string;
  showArrow?: boolean;
  limit?: number;
  forumId?: string; // ถ้าระบุ forumId จะดึงแค่หัวข้อในฟอรัมนั้น
  viewAllLink?: string; // ลิงก์สำหรับปุ่ม "ดูทั้งหมด"
}

export function TopicList({
  title = "หัวข้อล่าสุด",
  className,
  showArrow = true,
  limit = 6,
  forumId,
  viewAllLink = "/topic"
}: TopicListProps) {
  const { fetchTopics, fetchTopicsByForum, isLoading, error } = useTopic();
  const [topics, setTopics] = useState<Topic[]>([]);

  // Load topics เมื่อ component mount
  useEffect(() => {
    const loadTopics = async () => {
      try {
        let result;

        if (forumId) {
          // ดึงหัวข้อจากฟอรัมเฉพาะ
          result = await fetchTopicsByForum(forumId, {
            offset: 0,
            limit: limit
          });
        } else {
          // ดึงหัวข้อทั้งหมด
          result = await fetchTopics({
            offset: 0,
            limit: limit
          });
        }

        if (result.success) {
          setTopics(result.topics);
        }
      } catch (err) {
        console.error('Error loading topics:', err);
      }
    };

    loadTopics();
  }, [fetchTopics, fetchTopicsByForum, limit, forumId]);

  // แสดง loading state
  if (isLoading) {
    return (
      <div className={cn("bg-card rounded-lg overflow-hidden", className)}>
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-semibold text-lg">{title}</h2>
          {showArrow && (
            <Link href={viewAllLink} className="text-muted-foreground hover:text-foreground">
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
        <div className="p-4">
          <div className="text-muted-foreground text-center">กำลังโหลดหัวข้อ...</div>
        </div>
      </div>
    );
  }

  // แสดง error state
  if (error) {
    return (
      <div className={cn("bg-card rounded-lg overflow-hidden", className)}>
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-semibold text-lg">{title}</h2>
          {showArrow && (
            <Link href={viewAllLink} className="text-muted-foreground hover:text-foreground">
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
        <div className="p-4">
          <div className="text-destructive text-center">เกิดข้อผิดพลาด: {error}</div>
        </div>
      </div>
    );
  }

  // แสดง empty state
  if (!isLoading && topics.length === 0) {
    return (
      <div className={cn("bg-card rounded-lg overflow-hidden", className)}>
        <div className="p-4 flex items-center justify-between">
          <h2 className="font-semibold text-lg">{title}</h2>
          {showArrow && (
            <Link href={viewAllLink} className="text-muted-foreground hover:text-foreground">
              <ArrowRight size={20} />
            </Link>
          )}
        </div>
        <div className="p-4">
          <div className="text-muted-foreground text-center">ไม่พบหัวข้อ</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-card rounded-lg overflow-hidden", className)}>
      <div className="p-4 flex items-center justify-between">
        <h2 className="font-semibold text-lg">{title}</h2>
        {showArrow && (
          <Link href={viewAllLink} className="text-muted-foreground hover:text-foreground">
            <ArrowRight size={20} />
          </Link>
        )}
      </div>

      <div className="divide-y divide-border">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/topic/${topic.id}`}
            className="flex items-center p-4 hover:bg-secondary/50 transition-colors group"
          >
            <div className="mr-4 relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={topic.thumbnail || '/img.png'}
                alt={topic.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-base line-clamp-2">{topic.title}</h3>
             
              <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
             
                <span>{formatTimestamp(topic.createdAt)}</span>
              </div>
            </div>

            <div className="ml-2">
              <ArrowRight
                size={18}
                className="text-muted-foreground group-hover:text-foreground transition-colors"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}