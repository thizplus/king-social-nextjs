// app/(main)/topic/[id]/page.tsx
"use client"

import { useState, useEffect, use, useCallback } from 'react';
import { notFound } from 'next/navigation';
import { TopicDetail } from '@/components/pages/topic/TopicDetail';
import { TopicReplies } from '@/components/pages/topic/TopicReplies';

import { useTopic } from '@/hooks/useTopic';
import type { Topic } from '@/types/models/topic';
import GroupTopicCard from '@/components/pages/home/GroupTopicCard';

interface TopicPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function TopicPage({ params }: TopicPageProps) {
  const resolvedParams = use(params);
  const { fetchTopicById } = useTopic();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReplyForm, setShowReplyForm] = useState(false);

  useEffect(() => {
    const loadTopic = async () => {
      try {
        setLoading(true);
        const response = await fetchTopicById(resolvedParams.id);
        if (response.success && response.topic) {
          setTopic(response.topic);
        } else {
          notFound();
        }
      } catch (error) {
        console.error('Failed to load topic:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadTopic();
  }, [resolvedParams.id, fetchTopicById]);

  const handleReplyClick = useCallback(() => {
    setShowReplyForm(true);
  }, []);

  const handleReplyFormToggle = useCallback((isOpen: boolean) => {
    setShowReplyForm(isOpen);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-2/3 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-card rounded-lg p-6">
                  <div className="h-4 bg-muted rounded w-full mb-3"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-card rounded-lg p-4">
                  <div className="h-4 bg-muted rounded w-2/3 mb-3"></div>
                  <div className="h-4 bg-muted rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!topic) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Topic Detail (รวม Header + Content) */}
          <TopicDetail topic={topic} onReplyClick={handleReplyClick} />

          {/* Replies */}
          <TopicReplies
            topicId={resolvedParams.id}
            openReplyForm={showReplyForm}
            onReplyFormToggle={handleReplyFormToggle}
          />

          {/* Related Topics */}
          <div className="mt-8">
          <GroupTopicCard title="กระทู้ที่คุณอาจสนใจ"  />
          </div>
        </div>
      </div>
    </div>
  );
}