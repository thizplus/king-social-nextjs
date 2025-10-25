// app/(main)/tag/[slug]/page.tsx
"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTag } from '@/hooks/useTag';
import { useTopic } from '@/hooks/useTopic';
import { TopicCard } from '@/components/pages/home/TopicCard';
import { Badge } from '@/components/ui/badge';
import { Loader2, Hash, TrendingUp, Eye, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Tag } from '@/types/models/tag';
import type { Topic } from '@/types/models/topic';

export default function TagDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const { tags, loading: tagsLoading, getTagClasses, formatForUI } = useTag();
  const { searchTopics, isLoading: topicsLoading } = useTopic();

  const [tag, setTag] = useState<Tag | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug || !tags.length) return;

    const loadTagData = async () => {
      try {
        // Find tag by slug
        const foundTag = tags.find(t => t.slug === slug);
        if (!foundTag) {
          setError('ไม่พบแท็กที่ระบุ');
          return;
        }

        setTag(foundTag);

        // Search topics with this tag
        const topicsResult = await searchTopics(foundTag.name);
        if (topicsResult.success && topicsResult.topics) {
          setTopics(topicsResult.topics);
        }
      } catch (err) {
        console.error('Error loading tag data:', err);
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
    };

    loadTagData();
  }, [slug, tags, searchTopics]);

  if (tagsLoading || topicsLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">กำลังโหลดแท็ก...</p>
        </div>
      </div>
    );
  }

  if (error || !tag) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">ไม่พบแท็ก</h1>
          <p className="text-muted-foreground">{error || 'แท็กที่ระบุไม่มีอยู่ในระบบ'}</p>
        </div>
      </div>
    );
  }

  const formattedTag = formatForUI(tag);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Tag Header */}
      <div className="bg-card rounded-lg p-6 mb-6 border">
        <div className="flex items-start gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-secondary">
            <Hash size={32} className={getTagClasses(tag.color)} />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">{tag.name}</h1>
              <Badge
                variant="secondary"
                className={cn("text-xs", getTagClasses(tag.color))}
                style={{
                  backgroundColor: `${tag.color}20`,
                  borderColor: tag.color
                }}
              >
                #{tag.slug}
              </Badge>
            </div>

            {tag.description && (
              <p className="text-muted-foreground mb-4">{tag.description}</p>
            )}

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye size={16} />
                <span>{formattedTag.formattedUsageCount} การใช้งาน</span>
              </div>

              {formattedTag.isPopular && (
                <div className="flex items-center gap-1 text-orange-600">
                  <TrendingUp size={16} />
                  <span>ยอดนิยม</span>
                </div>
              )}

              {formattedTag.isNew && (
                <div className="flex items-center gap-1 text-green-600">
                  <span>• ใหม่</span>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                สร้างเมื่อ {new Date(tag.createdAt).toLocaleDateString('th-TH')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics with this tag */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          เนื้อหาที่มีแท็ก &ldquo;{tag.name}&rdquo;
        </h2>

        {topics.length === 0 ? (
          <div className="bg-card rounded-lg p-8 text-center border">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">ยังไม่มีเนื้อหา</h3>
            <p className="text-muted-foreground">
              ยังไม่มีหัวข้อที่ใช้แท็กนี้
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

      {/* Related Tags */}
      {tags.length > 1 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">แท็กที่เกี่ยวข้อง</h3>
          <div className="flex flex-wrap gap-2">
            {tags
              .filter(t => t.id !== tag.id && t.isActive)
              .slice(0, 10)
              .map((relatedTag) => (
                <Badge
                  key={relatedTag.id}
                  variant="secondary"
                  className="cursor-pointer hover:bg-secondary/80"
                  onClick={() => window.location.href = `/tag/${relatedTag.slug}`}
                >
                  <Hash size={12} className="mr-1" />
                  {relatedTag.name}
                </Badge>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}