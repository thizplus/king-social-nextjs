// components/CategoryScroll.tsx
"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForum } from '@/hooks/useForum';
import type { Forum } from '@/types/models/forum';
import { Users } from 'lucide-react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules
import { Grid, Pagination, Navigation } from 'swiper/modules';
import { SwiperOptions } from 'swiper/types';

interface Category {
  icon: React.ReactNode;
  label: string;
  slug?: string; // เพิ่ม slug สำหรับ Forum
  id?: string; // เพิ่ม id สำหรับ Forum
}

interface CategoryScrollProps {
  title?: string;
  className?: string;
  onCategoryClick?: (category: Category, forum: Forum) => void; // Optional callback
  mobileRows?: number; // จำนวนแถวบนมือถือ (ค่าเริ่มต้น: 2)
  showPagination?: boolean; // แสดง pagination หรือไม่
  showNavigation?: boolean; // แสดงปุ่มนำทางซ้าย-ขวาหรือไม่
  spaceBetween?: number; // ระยะห่างระหว่างรายการ
}

const CategoryScroll: React.FC<CategoryScrollProps> = ({
  title,
  className = "",
  onCategoryClick,
  mobileRows = 2,
  showPagination = true,
  showNavigation = false,
  spaceBetween = 16
}) => {
  const router = useRouter();
  const { fetchActiveForums, isLoading, error } = useForum();
  const [forums, setForums] = useState<Forum[]>([]);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);

  // ฟังก์ชันจัดการการคลิก
  const handleCategoryClick = (category: Category, forum: Forum) => {
    // เรียก callback ถ้ามี
    if (onCategoryClick) {
      onCategoryClick(category, forum);
    } else {
      // ถ้าไม่มี callback ให้ navigate ไปที่ forum page
      router.push(`/forum/${forum.slug}`);
    }
  };


  // Load forums data จาก API
  useEffect(() => {
    const loadForums = async () => {
      const result = await fetchActiveForums();
      if (result.success) {
        setForums(result.forums);

        // แปลง Forum data เป็น Category format
        const forumCategories: Category[] = result.forums.map(forum => ({
          icon: forum.icon ? (
            <Image
              src={forum.icon}
              alt={forum.name}
              width={24}
              height={24}
              className="w-6 h-6 object-cover rounded"
              onError={(e) => {
                // ถ้าโหลด image ไม่ได้ ให้ซ่อนและใช้ fallback icon
                e.currentTarget.style.display = 'none';
                const fallbackIcon = e.currentTarget.nextElementSibling as HTMLElement;
                if (fallbackIcon) fallbackIcon.style.display = 'block';
              }}
            />
          ) : null,
          label: forum.name,
          slug: forum.slug,
          id: forum.id,
        }));

        setCategoriesData(forumCategories);
      }
    };
    loadForums();
  }, [fetchActiveForums]);

  // แสดง loading state
  if (isLoading) {
    return (
      <div className={`w-full rounded-xl text-card-foreground ${className}`}>
        <div className="py-4">
          {title && <h2 className="text-primary text-lg font-medium px-4 mb-3">{title}</h2>}
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">กำลังโหลดหมวดหมู่...</div>
          </div>
        </div>
      </div>
    );
  }

  // แสดง error state
  if (error) {
    return (
      <div className={`w-full rounded-xl text-card-foreground ${className}`}>
        <div className="py-4">
          {title && <h2 className="text-primary text-lg font-medium px-4 mb-3">{title}</h2>}
          <div className="flex items-center justify-center py-8">
            <div className="text-destructive">เกิดข้อผิดพลาด: {error}</div>
          </div>
        </div>
      </div>
    );
  }

  // ถ้าไม่มีข้อมูลฟอรัม
  if (!isLoading && categoriesData.length === 0) {
    return (
      <div className={`w-full rounded-xl text-card-foreground ${className}`}>
        <div className="py-4">
          {title && <h2 className="text-primary text-lg font-medium px-4 mb-3">{title}</h2>}
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">ไม่พบหมวดหมู่ฟอรัม</div>
          </div>
        </div>
      </div>
    );
  }

  // สร้าง Breakpoints สำหรับ responsive
  const breakpoints = {
    // มือถือขนาดเล็ก
    320: {
      slidesPerView: 5,
      spaceBetween: 10,
      grid: {
        rows: mobileRows,
        fill: 'row'
      }
    },
    // มือถือขนาดกลาง
    480: {
      slidesPerView: 6,
      spaceBetween: 15,
      grid: {
        rows: mobileRows,
        fill: 'row'
      }
    },
    // แท็บเล็ต
    768: {
      slidesPerView: 8,
      spaceBetween: spaceBetween,
      grid: {
        rows: 1,
        fill: 'row'
      }
    },
    // เดสก์ท็อป
    1024: {
      slidesPerView: 12,
      spaceBetween: spaceBetween,
      grid: {
        rows: 1,
        fill: 'row'
      }
    },
    1920: {
      slidesPerView: 15,
      spaceBetween: spaceBetween,
      grid: {
        rows: 1,
        fill: 'row'
      }
    }
  };

  return (
    <div className={`w-full rounded-xl text-card-foreground ${className}`}>
      <div className="py-4">
        {title && <h2 className="text-primary text-lg font-medium px-4 mb-3">{title}</h2>}
        
        <div className="relative px-0">
          <Swiper
            grid={{
              rows: mobileRows,
              fill: 'row'
            }}
            slidesPerView={5}
            spaceBetween={spaceBetween}
            pagination={showPagination ? {
              clickable: true,
              dynamicBullets: true,
            } : false}
            navigation={showNavigation}
            modules={[Grid, Pagination, Navigation]}
            breakpoints={breakpoints as unknown as Record<number, SwiperOptions>}
            className="category-swiper"
          >
            {categoriesData.map((category, index) => {
              // หา forum object ที่เกี่ยวข้อง
              const relatedForum = forums.find(forum => forum.id === category.id || forum.slug === category.slug);

              return (
                <SwiperSlide key={category.id || index}>
                  <div
                    className="flex flex-col items-center justify-start focus:outline-none cursor-pointer select-none py-2 hover:opacity-80 transition-opacity"
                    onClick={() => {
                      if (relatedForum) {
                        handleCategoryClick(category, relatedForum);
                      }
                    }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary rounded-md flex items-center justify-center mb-1.5 border border-border relative">
                      {category.icon}
                      {/* Fallback icon เมื่อ image โหลดไม่ได้ */}
                      <span
                        className="text-secondary-foreground absolute inset-0 flex items-center justify-center"
                        style={{ display: category.icon ? 'none' : 'flex' }}
                      >
                        <Users size={24} />
                      </span>
                    </div>
                    <span className="text-xs text-center w-full whitespace-normal line-clamp-2 text-muted-foreground max-w-[70px] sm:max-w-[80px]">
                      {category.label}
                    </span>
                    {/* แสดงจำนวนหัวข้อ */}
                    {relatedForum && (
                      <span className="text-[10px] text-muted-foreground/70 mt-0.5">
                        {relatedForum.topicCount} หัวข้อ
                      </span>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
      
      {/* CSS เพิ่มเติมสำหรับ Swiper */}
      <style jsx global>{`
        .category-swiper {
          width: 100%;
          padding-bottom: ${showPagination ? '0' : '0'};
        }
        
        .category-swiper .swiper-pagination {
          bottom: 0;
        }
        
        .category-swiper .swiper-pagination-bullet {
          background: var(--primary);
          opacity: 0.5;
        }
        
        .category-swiper .swiper-pagination-bullet-active {
          opacity: 1;
        }
        
        .swiper-slide {
          height: auto;
        }
        
        /* ปุ่มนำทาง */
        .category-swiper .swiper-button-next,
        .category-swiper .swiper-button-prev {
          color: var(--primary);
          background: var(--secondary);
          width: 30px;
          height: 30px;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        
        .category-swiper .swiper-button-next:after,
        .category-swiper .swiper-button-prev:after {
          font-size: 14px;
          font-weight: bold;
        }
        
        .category-swiper .swiper-button-disabled {
          opacity: 0.3;
        }
        
        /* ซ่อนปุ่มนำทางบนมือถือ */
        @media (max-width: 767px) {
          .category-swiper .swiper-button-next,
          .category-swiper .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default CategoryScroll;