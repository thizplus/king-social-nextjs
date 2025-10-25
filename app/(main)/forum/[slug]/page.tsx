// app/(main)/forum/[slug]/page.tsx
"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useForum } from '@/hooks/useForum';
import CategoryScroll from '@/components/pages/home/CategoryScroll';
import GroupThreadCard from '@/components/pages/home/GroupThreadCard';
import { Loader2, MessageSquare, TrendingUp } from 'lucide-react';
import type { Forum } from '@/types/models/forum';

export default function ForumDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { fetchForumBySlug, isLoading: forumLoading } = useForum();

  const [forum, setForum] = useState<Forum | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const loadForumData = async () => {
      try {
        // Load forum info only
        const forumResult = await fetchForumBySlug(slug);
        if (forumResult.success && forumResult.forum) {
          setForum(forumResult.forum);
        } else {
          setError('ไม่พบฟอรัมที่ระบุ');
        }
      } catch (err) {
        console.error('Error loading forum:', err);
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
    };

    loadForumData();
  }, [slug, fetchForumBySlug]);

  if (forumLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">กำลังโหลดฟอรัม...</p>
        </div>
      </div>
    );
  }

  if (error || !forum) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">ไม่พบฟอรัม</h1>
          <p className="text-muted-foreground">{error || 'ฟอรัมที่ระบุไม่มีอยู่ในระบบ'}</p>
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
                  <span>{forum.topicCount || 0} หัวข้อ</span>
                </div>
                {forum.topicCount > 50 && (
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
        <GroupThreadCard
          title="กระทู้ล่าสุด"
          forumSlug={slug}
          limit={20}
          showHeader={true}
          showDivider={true}
        />
      </div>
    </div>
  );
}