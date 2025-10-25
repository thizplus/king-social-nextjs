// app/(main)/forums/[slug]/page.tsx
"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useForum } from '@/hooks/useForum';
import { useTopic } from '@/hooks/useTopic';
import { TopicCard } from '@/components/pages/home/TopicCard';
import CategoryScroll from '@/components/pages/home/CategoryScroll';
import { Loader2, MessageSquare, TrendingUp } from 'lucide-react';
import type { Forum } from '@/types/models/forum';
import type { Topic } from '@/types/models/topic';

export default function ForumDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { fetchForumBySlug, isLoading: forumLoading } = useForum();
  const { fetchTopicsByForumSlug, isLoading: topicsLoading } = useTopic();

  const [forum, setForum] = useState<Forum | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const loadForumData = async () => {
      try {
        // Load forum info
        const forumResult = await fetchForumBySlug(slug);
        if (forumResult.success && forumResult.forum) {
          setForum(forumResult.forum);

          // Load topics for this forum using the new slug-based endpoint
          const topicsResult = await fetchTopicsByForumSlug(slug);
          if (topicsResult.success && topicsResult.topics) {
            setTopics(topicsResult.topics);
          }
        } else {
          setError('ไม่พบฟอรัมที่ระบุ');
        }
      } catch (err) {
        console.error('Error loading forum:', err);
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
    };

    loadForumData();
  }, [slug, fetchForumBySlug, fetchTopicsByForumSlug]);

  if (forumLoading || topicsLoading) {
    return (
      <div className="container max-w-6xl mx-auto h-full px-4 pb-8">
        <CategoryScroll />
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">กำลังโหลดฟอรัม...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !forum) {
    return (
      <div className="container max-w-6xl mx-auto h-full px-4 pb-8">
        <CategoryScroll />
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">ไม่พบฟอรัม</h1>
            <p className="text-muted-foreground">{error || 'ฟอรัมที่ระบุไม่มีอยู่ในระบบ'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto h-full px-4 pb-8">
      <CategoryScroll />

      <div className="py-6">
        {/* Forum Header */}
        <div className="bg-card rounded-lg p-6 mb-6 border">
          <div className="flex items-start gap-4">
            {forum.icon && (
              <div className="text-4xl">
                {forum.icon}
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{forum.name}</h1>
              <p className="text-muted-foreground mb-4">{forum.description}</p>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MessageSquare size={16} />
                  <span>{topics.length} หัวข้อ</span>
                </div>
                {topics.length > 50 && (
                  <div className="flex items-center gap-1 text-orange-600">
                    <TrendingUp size={16} />
                    <span>ยอดนิยม</span>
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  สร้างเมื่อ {new Date(forum.createdAt).toLocaleDateString('th-TH')}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Topics List */}
        <div>
          <h2 className="text-xl font-semibold mb-4">หัวข้อในฟอรัม</h2>

          {topics.length === 0 ? (
            <div className="bg-card rounded-lg p-8 text-center border">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">ยังไม่มีหัวข้อ</h3>
              <p className="text-muted-foreground">
                เป็นคนแรกที่สร้างหัวข้อในฟอรัมนี้
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {topics.map((topic) => (
                <TopicCard
                  key={topic.id}
                  id={topic.id}
                  title={topic.title}
                  author={{
                    id: topic.user?.id || topic.userId,
                    name: topic.user ? `${topic.user.firstName} ${topic.user.lastName}`.trim() : 'Unknown User',
                    image: topic.user?.avatar
                  }}
                  tags={[]}
                  timestamp={topic.createdAt}
                  views={topic.viewCount || 0}
                  likes={0}
                  comments={topic.replyCount || 0}
                  thumbnailUrl={topic.thumbnail || '/placeholder-topic.jpg'}
                  isLiked={false}
                  isSaved={false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}