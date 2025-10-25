// components/sidebar/SectionNav.tsx
"use client"

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string | number;
  active?: boolean;
}

interface SectionNavProps {
  items: NavItem[];
  className?: string;
  bordered?: boolean;
  variant?: 'default' | 'accent' | 'minimal'; // สไตล์การแสดงผล
}

export function SectionNav({ 
  items, 
  className,
  bordered = true,
  variant = 'default'
}: SectionNavProps) {
  // กำหนดสไตล์ตาม variant
  const getContainerClass = () => {
    switch (variant) {
      case 'accent':
        return "bg-card rounded-lg overflow-hidden border-l-4 border-l-primary";
      case 'minimal':
        return "bg-transparent";
      default:
        return cn("bg-card rounded-lg overflow-hidden", bordered && "border border-border");
    }
  };
  
  const getItemClass = (active: boolean = false) => {
    switch (variant) {
      case 'accent':
        return cn(
          "flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors",
          active && "bg-primary/5 font-medium"
        );
      case 'minimal':
        return cn(
          "flex items-center gap-3 p-2.5 hover:bg-secondary/50 rounded-md transition-colors",
          active && "text-primary font-medium"
        );
      default:
        return cn(
          "flex items-center gap-3 p-3 hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0",
          active && "bg-secondary/50 font-medium"
        );
    }
  };
  
  return (
    <div className={cn(getContainerClass(), className)}>
      <nav>
        {items.map((item) => (
          <Link 
            key={item.id} 
            href={item.href}
            className={getItemClass(item.active)}
          >
            {item.icon && (
              <div className="flex-shrink-0 text-primary">
                {item.icon}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.title}</p>
                {item.badge && (
                  <span className="ml-2 text-xs text-primary px-1.5 py-0.5 bg-primary/10 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              {item.description && (
                <p className="text-xs text-muted-foreground">{item.description}</p>
              )}
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}