// components/pages/home/TrendingTags.tsx
"use client"

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Hash, TrendingUp } from 'lucide-react';
import { useTag } from '@/hooks/useTag';
import { useEffect, useState } from 'react';
import type { Tag } from '@/types/models/tag';

interface TrendingTagsProps {
  title?: string;
  className?: string;
  maxItems?: number;
  showPostCount?: boolean;
  variant?: 'default' | 'compact' | 'minimal';
  showTitle?: boolean;
}

export function TrendingTags({
  title = "แท็กฮิต",
  className,
  maxItems = 10,
  showPostCount = false,
  variant = 'default',
  showTitle = true
}: TrendingTagsProps) {
  // Tag management
  const { getPopularTags, getTagClasses, formatForUI } = useTag();
  const [popularTags, setPopularTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  // Load popular tags
  useEffect(() => {
    const loadPopularTags = async () => {
      try {
        setLoading(true);
        const response = await getPopularTags(maxItems);
        console.log('response', response);
        if (response?.tags) {
          setPopularTags(response.tags);

        
        } else {
          setPopularTags([]);
        }
      } catch (error) {
        console.error('Failed to load popular tags:', error);
        // Fallback to empty array
        setPopularTags([]);
      } finally {
        setLoading(false);
      }
    };

    loadPopularTags();
  }, [getPopularTags, maxItems]);

  // จำกัดจำนวนแท็กที่แสดง
  const limitedTags = popularTags.slice(0, maxItems);

  return (
    <div className={cn(
      "bg-card rounded-lg overflow-hidden border border-border",
      variant === 'minimal' && "bg-transparent border-0",
      className
    )}>
      {showTitle && (
        <div className={cn(
          "p-3 border-b border-border",
          variant === 'minimal' && "border-b-0 px-0"
        )}>
          <h2 className="font-semibold text-lg">{title}</h2>
        </div>
      )}

      <div className={cn(
        variant === 'compact' ? "divide-y divide-border" : "p-2"
      )}>
        {loading ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            กำลังโหลดแท็กฮิต...
          </div>
        ) : limitedTags.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">
            ไม่มีแท็กฮิต
          </div>
        ) : variant === 'default' ? (
          <div className="space-y-1">
            {limitedTags.map((tag) => {
              const formattedTag = formatForUI(tag);
              return (
                <Link
                  key={tag.id}
                  href={`/tag/${tag.slug}`}
                  className="flex items-center p-2 hover:bg-secondary/50 rounded-md transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center ">
                    <Hash size={18} className={getTagClasses(tag.color)} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{tag.name}</p>
                    {(showPostCount || formattedTag.isPopular) && (
                      <div className="flex items-center flex-wrap gap-1 text-xs text-muted-foreground">
                        {showPostCount && tag.usageCount > 0 && (
                          <span>{formattedTag.formattedUsageCount} การใช้งาน</span>
                        )}
                        {formattedTag.isPopular && (
                          <span className="inline-flex items-center text-orange-600">
                            <TrendingUp size={12} className="mr-1" />
                            ยอดนิยม
                          </span>
                        )}
                        {formattedTag.isNew && (
                          <span className="inline-flex items-center text-green-600">
                            • ใหม่
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ) : variant === 'compact' ? (
          // แบบ compact เรียงต่อกันโดยมีเส้นแบ่ง
          <div>
            {limitedTags.map((tag) => {
              const formattedTag = formatForUI(tag);
              return (
                <Link
                  key={tag.id}
                  href={`/tag/${tag.slug}`}
                  className="flex items-center py-3 px-3 hover:bg-secondary/50 transition-colors"
                >
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mr-2 bg-secondary/50">
                    <Hash size={12} className={cn("mr-1", getTagClasses(tag.color))} />
                    {tag.name}
                  </span>
                  {formattedTag.isPopular && (
                    <span className="ml-auto text-xs text-orange-600">
                      <TrendingUp size={12} />
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ) : (
          // แบบ minimal
          <div className="space-y-1 pt-1">
            {limitedTags.map((tag) => (
              <Link
                key={tag.id}
                href={`/tag/${tag.slug}`}
                className="flex items-center py-2 hover:bg-secondary/50 rounded-md transition-colors"
              >
                <Hash size={14} className={cn("mr-2", getTagClasses(tag.color))} />
                <p className="text-sm font-medium">{tag.name}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}