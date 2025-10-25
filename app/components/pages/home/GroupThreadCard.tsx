// components/GroupThreadCard.tsx
"use client"

import React, { useEffect, useState } from 'react'
import { useTopic } from '@/hooks/useTopic'
import { formatTimestampShort } from '@/lib/utils'
import type { Topic } from '@/types/models/topic'
import { ThreadCard } from './ThreadCard'

// Helper function เพื่อสร้าง categories จาก forum data
const getTopicCategories = (topic: Topic): string[] => {
  const categories = [];

  // เพิ่มชื่อฟอรัมเป็น category หลัก
  if (topic.forum?.name) {
    categories.push(topic.forum.name);
  }

  return categories;
};

// Helper function เพื่อกำหนดว่าหัวข้อเป็น "Hot" หรือไม่
const isHotTopic = (topic: Topic): boolean => {
  // ถือว่า Hot ถ้าม view count > 100 หรือ reply count > 10
  return topic.viewCount > 100 || topic.replyCount > 10 || topic.isPinned;
};

interface GroupThreadCardProps {
  title?: string;
  description?: string;
  className?: string;
  limit?: number; // จำกัดจำนวนกระทู้ที่แสดง
  showHeader?: boolean; // แสดงส่วนหัวหรือไม่
  showDivider?: boolean; // แสดงเส้นแบ่งระหว่างกระทู้หรือไม่
  forumId?: string; // ถ้าระบุ forumId จะดึงแค่หัวข้อในฟอรัมนั้น (legacy)
  forumSlug?: string; // ถ้าระบุ forumSlug จะดึงแค่หัวข้อในฟอรัมนั้น (ใหม่)
}

const GroupThreadCard: React.FC<GroupThreadCardProps> = ({
  title = "กระทู้ล่าสุด",
  description,
  className = "",
  limit = 10,
  showHeader = true,
  showDivider = true,
  forumId,
  forumSlug
}) => {
  const { fetchTopics, fetchTopicsByForum, fetchTopicsByForumSlug, isLoading, error } = useTopic();
  const [topics, setTopics] = useState<Topic[]>([]);

  // Load topics เมื่อ component mount
  useEffect(() => {
    const loadTopics = async () => {
      try {
        let result;

        if (forumSlug) {
          // ดึงหัวข้อจากฟอรัมเฉพาะด้วย slug (ใหม่)
          result = await fetchTopicsByForumSlug(forumSlug, {
            offset: 0,
            limit: limit
          });
        } else if (forumId) {
          // ดึงหัวข้อจากฟอรัมเฉพาะด้วย ID (legacy)
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
  }, [fetchTopics, fetchTopicsByForum, fetchTopicsByForumSlug, limit, forumId, forumSlug]);

  // แสดง loading state
  if (isLoading) {
    return (
      <div className={className}>
        {showHeader && (
          <div className="mb-4">
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        )}
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">กำลังโหลดกระทู้...</div>
        </div>
      </div>
    );
  }

  // แสดง error state
  if (error) {
    return (
      <div className={className}>
        {showHeader && (
          <div className="mb-4">
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        )}
        <div className="flex items-center justify-center py-8">
          <div className="text-destructive">เกิดข้อผิดพลาด: {error}</div>
        </div>
      </div>
    );
  }

  // แสดง empty state
  if (!isLoading && topics.length === 0) {
    return (
      <div className={className}>
        {showHeader && (
          <div className="mb-4">
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        )}
        <div className="flex items-center justify-center py-8">
          <div className="text-muted-foreground">ไม่พบกระทู้</div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* ส่วนหัว */}
      {showHeader && (
        <div className="mb-4">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}

      {/* รายการกระทู้ */}
      <div className={showDivider ? "divide-y divide-border" : "space-y-4"}>
        {topics.map((topic, index) => (
          <div key={topic.id} className={index > 0 && showDivider ? "" : ""}>
            <ThreadCard
              id={topic.id}
              title={topic.title}
              author={topic.user?.displayName || topic.user?.firstName || 'Anonymous'}
              authorId={topic.userId}
              categories={getTopicCategories(topic)}
              timestamp={formatTimestampShort(topic.createdAt)}
              commentCount={topic.replyCount}
              thumbnailUrl={topic.thumbnail}
              isHot={isHotTopic(topic)}
              isAd={false} // Topics จาก API ไม่ใช่โฆษณา
              isCr={false} // ถ้ามี field สำหรับ CR ใน Topic model ให้ปรับได้
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupThreadCard