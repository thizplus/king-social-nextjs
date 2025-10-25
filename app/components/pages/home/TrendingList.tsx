// components/sidebar/TrendingList.tsx
"use client"

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TrendingItem {
  id: string;
  title: string;
  href: string;
}

interface TrendingListProps {
  title: string;
  items: TrendingItem[];
  className?: string;
  bordered?: boolean;
  highlight?: boolean; // ไฮไลท์หัวข้อแรก
}

export function TrendingList({ 
  title, 
  items, 
  className,
  bordered = true,
  highlight = false
}: TrendingListProps) {
  return (
    <div className={cn(
      "bg-card rounded-lg overflow-hidden", 
      bordered && "border border-border",
      className
    )}>
      {title && (
        <div className={cn(
          "p-3 border-b border-border",
          highlight && "bg-primary/5"
        )}>
          <h2 className={cn(
            "font-semibold",
            highlight ? "text-primary text-lg" : "text-foreground"
          )}>
            {title}
          </h2>
        </div>
      )}
      <div className="divide-y divide-border">
        {items.map((item, index) => (
          <Link 
            key={item.id} 
            href={item.href}
            className={cn(
              "block p-3 hover:bg-secondary/50 transition-colors",
              index === 0 && highlight && "bg-primary/5"
            )}
          >
            <p className="text-sm font-medium">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}