// components/sidebar/TagsList.tsx
"use client"

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface Tag {
  id: string;
  name: string;
  icon?: React.ReactNode;
  count: number;
  trending?: boolean;
  location?: string;
  color?: string;
}

interface TagsListProps {
  title: string;
  tags: Tag[];
  className?: string;
}

export function TagsList({ title, tags, className }: TagsListProps) {
  return (
    <div className={cn("bg-card rounded-lg overflow-hidden", className)}>
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg">{title}</h2>
      </div>
      <div className="p-2">
        <div className="space-y-1">
          {tags.map((tag) => (
            <Link 
              key={tag.id} 
              href={`/tag/${tag.id}`}
              className="flex items-center p-2 hover:bg-secondary/50 rounded-md transition-colors"
            >
              {tag.icon ? (
                <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mr-3", 
                  tag.color || "bg-primary/10")}>
                  {tag.icon}
                </div>
              ) : (
                <div className={cn("w-8 h-8 rounded-md flex items-center justify-center mr-3", 
                  tag.color || "bg-primary/10")}>
                  <span className="text-primary">#</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <p className="text-sm font-medium truncate">{tag.name}</p>
                  {tag.trending && (
                    <span className="ml-2 text-xs text-primary px-1.5 py-0.5 bg-primary/10 rounded-full">
                      Trending
                    </span>
                  )}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{tag.count.toLocaleString()} Posted</span>
                  {tag.location && (
                    <span className="ml-2">• Trending in {tag.location}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}