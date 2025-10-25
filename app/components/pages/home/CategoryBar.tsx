// components/CategoryBar.tsx
"use client"

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  href: string;
  icon: React.ReactNode;
  active?: boolean;
}

interface CategoryBarProps {
  categories: Category[];
  className?: string;
}

export function CategoryBar({ categories, className }: CategoryBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // ตรวจสอบว่าควรแสดงลูกศรหรือไม่
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      // ตรวจสอบครั้งแรกหลังจากโหลด
      checkScrollPosition();
      
      // สังเกตการเปลี่ยนแปลงขนาดหน้าจอ
      window.addEventListener('resize', checkScrollPosition);
      
      // คืนค่าเมื่อ unmount
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, []);

  // ฟังก์ชั่นเลื่อน
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={cn("relative bg-card border-b border-border", className)}>
      {/* ปุ่มเลื่อนซ้าย */}
      {showLeftArrow && (
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 h-full flex items-center justify-center px-1"
          aria-label="เลื่อนไปทางซ้าย"
        >
          <div className="bg-secondary/80 h-8 w-8 rounded-full flex items-center justify-center">
            <ChevronLeft size={20} className="text-secondary-foreground" />
          </div>
        </button>
      )}
      
      {/* ช่องเลื่อน */}
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide py-2 px-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => (
          <Link 
            key={category.id} 
            href={category.href}
            className={cn(
              "flex flex-col items-center min-w-[72px] px-2",
              category.active ? "text-primary" : "text-muted-foreground"
            )}
          >
            <div className={cn(
              "w-14 h-14 rounded-md flex items-center justify-center mb-1",
              category.active ? "bg-primary/10" : "bg-secondary"
            )}>
              {category.icon}
            </div>
            <span className="text-xs text-center w-full truncate">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
      
      {/* ปุ่มเลื่อนขวา */}
      {showRightArrow && (
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-card/90 h-full flex items-center justify-center px-1"
          aria-label="เลื่อนไปทางขวา"
        >
          <div className="bg-secondary/80 h-8 w-8 rounded-full flex items-center justify-center">
            <ChevronRight size={20} className="text-secondary-foreground" />
          </div>
        </button>
      )}
      
      {/* CSS สำหรับซ่อน scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}