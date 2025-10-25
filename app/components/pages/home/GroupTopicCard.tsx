// components/GroupTopicCard.tsx
"use client"

import React, { useState, useEffect } from 'react'
import { useTopic } from '@/hooks/useTopic'
import { useTopicLike } from '@/hooks/useLike'
import { formatTimestamp } from '@/lib/utils'
import type { Topic } from '@/types/models/topic'
import { TopicCard } from './TopicCard'

// Helper function เพื่อสร้าง tags จาก forum data
const getTopicTags = (topic: Topic): string[] => {
  const tags = [];

  // เพิ่มชื่อฟอรัมเป็น tag หลัก
  if (topic.forum?.name) {
    tags.push(topic.forum.name);
  }

  // เพิ่ม tag อื่นๆ ตาม logic ที่ต้องการ
  // สามารถเพิ่มจาก topic categories หรือ keywords ใน content ได้

  return tags;
};

// Helper function เพื่อสร้าง author object
const getTopicAuthor = (topic: Topic) => {
  return {
    id: topic.userId,
    name: topic.user?.displayName || topic.user?.firstName || 'Anonymous',
    image: topic.user?.avatar,
    verified: topic.user?.isVerified || false
  };
};

// Individual TopicCard component with like functionality
interface TopicCardWithLikeProps {
  topic: Topic;
  isSaved: boolean;
  onSave: (id: string) => void;
}

const TopicCardWithLike: React.FC<TopicCardWithLikeProps> = ({ topic, isSaved, onSave }) => {
  // Use the like hook with auto fetch for this specific topic
  const { isLiked, likeCount, toggleLike, isToggling } = useTopicLike(topic.id, { autoFetch: true });

  const handleLike = async () => {
    if (isToggling) return; // Prevent multiple clicks
    await toggleLike(topic.id);
  };

  return (
    <TopicCard
      id={topic.id}
      title={topic.title}
      author={getTopicAuthor(topic)}
      tags={getTopicTags(topic)}
      timestamp={formatTimestamp(topic.createdAt)}
      views={topic.viewCount}
      likes={likeCount}
      comments={topic.replyCount}
      thumbnailUrl={topic.thumbnail || '/img.png'}
      isLiked={isLiked}
      isSaved={isSaved}
      onLike={handleLike}
      onSave={onSave}
      useLiveData={false} // Use props instead of internal hook
    />
  );
};

interface GroupTopicCardProps {
  title?: string;
  description?: string;
  className?: string;
  limit?: number; // จำกัดจำนวนหัวข้อที่แสดง
  showHeader?: boolean; // แสดงส่วนหัวหรือไม่
  forumId?: string; // ถ้าระบุ forumId จะดึงแค่หัวข้อในฟอรัมนั้น
  excludeTopicId?: string; // exclude specific topic ID
}

const GroupTopicCard: React.FC<GroupTopicCardProps> = ({
  title = "หัวข้อแนะนำ",
  description,
  className = "",
  limit = 10,
  showHeader = true,
  forumId,
  excludeTopicId
}) => {
  const { fetchTopics, fetchTopicsByForum, isLoading, error } = useTopic();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [savedTopics, setSavedTopics] = useState<string[]>([]);

  // Load topics เมื่อ component mount
  useEffect(() => {
    const loadTopics = async () => {
      try {
        let result;

        if (forumId) {
          // ดึงหัวข้อจากฟอรัมเฉพาะ
          // เพิ่ม limit ถ้ามี excludeTopicId เพื่อให้มีข้อมูลเหลือหลังจาก filter
          const apiLimit = excludeTopicId ? limit + 1 : limit;
          result = await fetchTopicsByForum(forumId, {
            offset: 0,
            limit: apiLimit
          });
        } else {
          // ดึงหัวข้อทั้งหมด
          const apiLimit = excludeTopicId ? limit + 1 : limit;
          result = await fetchTopics({
            offset: 0,
            limit: apiLimit
          });
        }

        if (result.success) {
          // Filter out excluded topic if specified
          let filteredTopics = result.topics;
          if (excludeTopicId) {
            filteredTopics = result.topics.filter(topic => topic.id !== excludeTopicId);
          }
          // Limit the results to the requested limit after filtering
          filteredTopics = filteredTopics.slice(0, limit);
          setTopics(filteredTopics);
        }
      } catch (err) {
        console.error('Error loading topics:', err);
      }
    };

    loadTopics();
  }, [fetchTopics, fetchTopicsByForum, limit, forumId, excludeTopicId]);

  // Toggle save topic
  const handleSaveTopic = (id: string) => {
    setSavedTopics(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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
          <div className="text-muted-foreground">กำลังโหลดหัวข้อ...</div>
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
          <div className="text-muted-foreground">ไม่พบหัวข้อ</div>
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

      {/* รายการหัวข้อ */}
      <div className="space-y-4">
        {topics.map((topic) => (
          <TopicCardWithLike
            key={topic.id}
            topic={topic}
            isSaved={savedTopics.includes(topic.id)}
            onSave={handleSaveTopic}
          />
        ))}
      </div>
    </div>
  )
}

export default GroupTopicCard