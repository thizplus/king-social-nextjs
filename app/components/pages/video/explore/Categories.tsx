// File: app/video/explore/components/Categories.tsx
import React, { useRef, useEffect } from 'react';

// Mock categories
const categories = [
  "ทั้งหมด", 
  "การร้องและละครเวที", 
  "ซีรีส์", 
  "กีฬา", 
  "อนิเมะและการ์ตูน", 
  "ความสัมพันธ์", 
  "รายการแสดง", 
  "อัปโหลด", 
  "ชีวิตประจำวัน", 
  "การดูแลผิวงาม", 
  "เกม", 
  "สังคม", 
  "เครื่องแต่งกาย"
];

interface CategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function Categories({ activeCategory, setActiveCategory }: CategoriesProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to active category when it changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const activeButton = container.querySelector(`button[data-category="${activeCategory}"]`) as HTMLElement;
      
      if (activeButton) {
        // Calculate position to scroll the active button into view (centered if possible)
        const containerWidth = container.clientWidth;
        const buttonLeft = activeButton.offsetLeft;
        const buttonWidth = activeButton.offsetWidth;
        
        // Center the button in the container
        const scrollLeft = buttonLeft - (containerWidth / 2) + (buttonWidth / 2);
        
        // Scroll smoothly
        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-10 bg-background border-b border-border">
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide"
      >
        <div className="flex whitespace-nowrap px-6 py-3 gap-4 min-w-max">
          {categories.map((category) => (
            <button
              key={category}
              data-category={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors flex-shrink-0 ${
                activeCategory === category
                  ? 'bg-primary text-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {/* CSS for hiding scrollbar */}
      <style jsx global>{`
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