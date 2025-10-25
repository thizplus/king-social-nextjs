// File: app/video/explore/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { TrendingHashtags } from '@/components/pages/video/explore/TrendingHashtags';
import { VideoList } from '@/components/pages/video/explore/VideoList';
import { Categories } from '@/components/pages/video/explore/Categories';

export default function ExplorePage() {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on client side and determine screen size
  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // If not mounted yet, don't render to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="w-full">
      {/* Categories - Only shown on desktop */}
      {!isMobile && (
        <Categories 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />
      )}
      
      {/* Content Container */}
      <div className="w-full">
        {/* Mobile View */}
        {isMobile && (
          <div className="bg-background text-foreground">
            <TrendingHashtags isMobile={true} />
            <VideoList isMobile={true} />
          </div>
        )}
        
        {/* Desktop View */}
        {!isMobile && (
          <div className="bg-background text-foreground max-w-7xl mx-auto px-6 py-4">
            <TrendingHashtags isMobile={false} />
            <VideoList isMobile={false} />
          </div>
        )}
      </div>
    </div>
  );
}
