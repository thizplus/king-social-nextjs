"use client";

import { useEffect, useState, useCallback } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useSpring, animated, config } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import VideoPlayer from "./VideoPlayer";
import VideoControls from "./VideoControls";
import VideoInfo from "./VideoInfo";

import { Video } from '@/types/models/video';

// Mock data for videos - คุณสามารถแทนที่ด้วยข้อมูลจริงจาก API ของคุณ
const mockVideos: Video[] = [
  {
    id: "1",
    userId: "user123",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Big Buck Bunny",
    description: "Short film about a rabbit and his adventures in the forest",
    thumbnailUrl: "https://i.pravatar.cc/640?img=1",
    duration: 596,
    width: 640,
    height: 360,
    fileSize: 5000000,
    viewCount: 15420,
    likeCount: 15420,
    commentCount: 892,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: "user123",
      username: "blender_foundation",
      displayName: "Blender Foundation",
      avatar: "https://i.pravatar.cc/300?img=1",
      firstName: "Blender",
      lastName: "Foundation"
    }
  },
  {
    id: "2",
    userId: "user456",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Elephant's Dream",
    description: "First open movie made entirely with open source graphics software",
    thumbnailUrl: "https://i.pravatar.cc/640?img=2",
    duration: 654,
    width: 1280,
    height: 720,
    fileSize: 6500000,
    viewCount: 8930,
    likeCount: 8930,
    commentCount: 456,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: "user456",
      username: "orange_studios",
      displayName: "Orange Studios",
      avatar: "https://i.pravatar.cc/300?img=2",
      firstName: "Orange",
      lastName: "Studios"
    }
  },
  {
    id: "3",
    userId: "user789",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "For Bigger Blazes",
    description: "A thrilling adventure with amazing visuals and sound",
    thumbnailUrl: "https://i.pravatar.cc/640?img=3",
    duration: 15,
    width: 1280,
    height: 720,
    fileSize: 2100000,
    viewCount: 12567,
    likeCount: 12567,
    commentCount: 678,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: "user789",
      username: "adventure_films",
      displayName: "Adventure Films",
      avatar: "https://i.pravatar.cc/300?img=3",
      firstName: "Adventure",
      lastName: "Films"
    }
  },
  {
    id: "4",
    userId: "user101",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    title: "Sintel",
    description: "A touching story about a girl and her dragon companion",
    thumbnailUrl: "https://i.pravatar.cc/640?img=4",
    duration: 888,
    width: 1920,
    height: 1080,
    fileSize: 9500000,
    viewCount: 23890,
    likeCount: 23890,
    commentCount: 1245,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: "user101",
      username: "durian_team",
      displayName: "Durian Team",
      avatar: "https://i.pravatar.cc/300?img=4",
      firstName: "Durian",
      lastName: "Team"
    }
  },
  {
    id: "5",
    userId: "user202",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    title: "Tears of Steel",
    description: "Sci-fi short film with impressive visual effects",
    thumbnailUrl: "https://i.pravatar.cc/640?img=5",
    duration: 734,
    width: 1920,
    height: 1080,
    fileSize: 8200000,
    viewCount: 18734,
    likeCount: 18734,
    commentCount: 934,
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    user: {
      id: "user202",
      username: "mango_team",
      displayName: "Mango Team",
      avatar: "https://i.pravatar.cc/300?img=5",
      firstName: "Mango",
      lastName: "Team"
    }
  }
];

export default function VideoFeed() {
  const [videos, setVideos] = useState(mockVideos);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewportHeight, setViewportHeight] = useState('100vh');
  const [isDragging, setIsDragging] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  // Setup for infinite scroll
  const { ref: bottomRef, inView } = useInView({
    threshold: 0.5,
  });

  // Check if we're on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Spring animation for smooth transitions
  const [{ y }, api] = useSpring(() => ({
    y: 0,
    config: {
      ...config.stiff, // ใช้ config ที่ responsive
      clamp: true, // ป้องกัน overshoot
    }
  }));

  // จัดการ viewport height สำหรับ Chrome Mobile
  useEffect(() => {
    if (!isClient) return;

    const updateViewportHeight = () => {
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) || window.innerWidth <= 768;
      
      const isChromeMobile = /Chrome/.test(navigator.userAgent) && isMobile;
      
      if (isMobile) {
        if (isChromeMobile) {
          if (window.visualViewport) {
            setViewportHeight(`${window.visualViewport.height}px`);
          } else {
            setViewportHeight(`${window.innerHeight}px`);
          }
        } else {
          setViewportHeight(`${window.innerHeight}px`);
        }
      } else {
        setViewportHeight('100vh');
      }

      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    updateViewportHeight();
    
    window.addEventListener('resize', updateViewportHeight);
    window.addEventListener('orientationchange', updateViewportHeight);
    
    let timeout: NodeJS.Timeout;
    const handleViewportChange = () => {
      clearTimeout(timeout);
      timeout = setTimeout(updateViewportHeight, 100);
    };
    
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange);
      window.visualViewport.addEventListener('scroll', handleViewportChange);
    }

    window.addEventListener('scroll', handleViewportChange, { passive: true });

    return () => {
      window.removeEventListener('resize', updateViewportHeight);
      window.removeEventListener('orientationchange', updateViewportHeight);
      window.removeEventListener('scroll', handleViewportChange);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleViewportChange);
        window.visualViewport.removeEventListener('scroll', handleViewportChange);
      }
      clearTimeout(timeout);
    };
  }, [isClient]);

  // Smooth drag gesture with @use-gesture - แก้ SSR issue
  const bind = useDrag(
    ({ 
      active, 
      movement: [, my], 
     // direction: [, dy], 
      velocity: [, vy], 
      cancel,
      event 
    }) => {
      // ตรวจสอบว่าเป็น interactive element หรือไม่
      const target = event?.target as HTMLElement;
      const isInteractiveElement = 
        target?.tagName === 'BUTTON' ||
        target?.tagName === 'A' ||
        target?.tagName === 'INPUT' ||
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('[role="button"]') ||
        target?.closest('.cursor-pointer') ||
        target?.classList.contains('interactive');

      // หยุด drag หากเป็น interactive element
      if (isInteractiveElement) {
        cancel();
        return;
      }

      setIsDragging(active);

      if (active) {
        // ขณะ drag - แสดง preview
        const currentY = isClient ? -currentVideoIndex * window.innerHeight : 0;
        api.start({
          y: currentY + my,
          immediate: true, // ไม่มี animation ขณะ drag
        });
      } else {
        // หลัง drag - ตัดสินใจว่าจะเปลี่ยน video หรือไม่
        const threshold = isClient ? window.innerHeight * 0.15 : 600 * 0.15; // ลด threshold เป็น 15%
        const shouldChangeVideo = Math.abs(my) > threshold || Math.abs(vy) > 0.4; // ลด velocity threshold

        if (shouldChangeVideo) {
          // เปลี่ยน video
          if (my < 0 && currentVideoIndex < videos.length - 1) {
            // Swipe up - next video
            setCurrentVideoIndex(prev => prev + 1);
          } else if (my > 0 && currentVideoIndex > 0) {
            // Swipe down - previous video  
            setCurrentVideoIndex(prev => prev - 1);
          } else {
            // กลับไปตำแหน่งเดิม
            const currentY = isClient ? -currentVideoIndex * window.innerHeight : 0;
            api.start({
              y: currentY,
              config: config.wobbly,
            });
          }
        } else {
          // กลับไปตำแหน่งเดิม
          const currentY = isClient ? -currentVideoIndex * window.innerHeight : 0;
          api.start({
            y: currentY,
            config: config.wobbly,
          });
        }
      }
    },
    {
      axis: 'y', // จำกัดให้ drag แค่แนวตั้ง
      bounds: isClient ? { 
        top: -(videos.length - 1) * window.innerHeight, 
        bottom: 0 
      } : { top: -5000, bottom: 0 }, // fallback สำหรับ SSR
      rubberband: true, // มี rubber band effect
      filterTaps: true, // กรอง tap events
      pointer: { touch: true }, // รองรับ touch
    }
  );

  // อัปเดต spring animation เมื่อ currentVideoIndex เปลี่ยน
  useEffect(() => {
    if (!isDragging && isClient) {
      api.start({
        y: -currentVideoIndex * window.innerHeight,
        config: config.stiff,
      });
    }
  }, [currentVideoIndex, isDragging, api, isClient]);
  
  // เมื่อเลื่อนถึงด้านล่าง จะโหลดวิดีโอเพิ่ม
  useEffect(() => {
    if (inView && !loading) {
      loadMoreVideos();
    }
  }, [inView, loading]);

  // จำลองการโหลดวิดีโอเพิ่ม
  const loadMoreVideos = () => {
    setLoading(true);
    
    setTimeout(() => {
      const newVideos = [...mockVideos].map((video, index) => ({
        ...video,
        id: `new-${Date.now()}-${index}`,
      }));
      
      setVideos(prev => [...prev, ...newVideos]);
      setLoading(false);
    }, 1500);
  };
  
  // Navigate to previous video
  const goToPrevVideo = useCallback(() => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(prev => prev - 1);
    }
  }, [currentVideoIndex]);

  // Navigate to next video
  const goToNextVideo = useCallback(() => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(prev => prev + 1);
    }
  }, [currentVideoIndex, videos.length]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isClient) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        goToPrevVideo();
      } else if (e.key === 'ArrowDown') {
        goToNextVideo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevVideo, goToNextVideo, isClient]);

  // Handle mouse wheel scroll (desktop)
  useEffect(() => {
    if (!isClient) return;

    let wheelTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (e.deltaY > 0) {
          goToNextVideo();
        } else if (e.deltaY < 0) {
          goToPrevVideo();
        }
      }, 100);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimeout);
    };
  }, [goToPrevVideo, goToNextVideo, isClient]);

  // ป้องกัน pull-to-refresh
  useEffect(() => {
    if (!isClient) return;

    const preventPullToRefresh = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        const target = e.target as HTMLElement;
        const isInteractiveElement = 
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer') ||
          target.classList.contains('interactive');
        
        if (!isInteractiveElement) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('touchstart', preventPullToRefresh, { passive: false });
    document.addEventListener('touchmove', preventPullToRefresh, { passive: false });
    
    document.body.style.overscrollBehavior = 'none';
    document.documentElement.style.overscrollBehavior = 'none';
    
    return () => {
      document.removeEventListener('touchstart', preventPullToRefresh);
      document.removeEventListener('touchmove', preventPullToRefresh);
      document.body.style.overscrollBehavior = '';
      document.documentElement.style.overscrollBehavior = '';
    };
  }, [isClient]);

  // ถ้ายังไม่ได้ hydrate ให้แสดง loading
  if (!isClient) {
    return (
      <div 
        style={{ 
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
          backgroundColor: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div 
      data-video-container="true"
      style={{ 
        height: viewportHeight,
        width: '100%',
        overflow: 'hidden',
        overscrollBehavior: 'none',
       // WebkitOverscrollBehavior: 'none',
        touchAction: 'pan-y',
      }}
    >
      {/* Navigation arrows */}
      <div className="hidden md:flex fixed top-1/2 right-6 z-30 -translate-y-1/2 flex-col gap-4 md:right-10">
        <button 
          onClick={goToPrevVideo}
          disabled={currentVideoIndex === 0}
          className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white disabled:opacity-30 hover:bg-black/60 transition-all interactive"
          aria-label="Previous video"
        >
          <ChevronUp size={28} />
        </button>
        <button 
          onClick={goToNextVideo}
          disabled={currentVideoIndex === videos.length - 1 && !loading}
          className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white disabled:opacity-30 hover:bg-black/60 transition-all interactive"
          aria-label="Next video"
        >
          <ChevronDown size={28} />
        </button>
      </div>
      
      {/* Main container with smooth spring animation */}
      <animated.div 
        {...bind()}
        className="h-full will-change-transform"
        style={{ 
          y,
          height: '100%',
          touchAction: 'none', // ป้องกัน default touch behaviors
        }}
      >
        {videos.map((video, index) => (
          <div key={video.id} style={{ height: viewportHeight, width: '100%' }}>
            {/* Mobile layout */}
            <div className="md:hidden h-full w-full relative">
              <div style={{ height: viewportHeight }} className="w-full max-w-[500px] mx-auto relative">
                <VideoPlayer 
                  video={video} 
                  isActive={index === currentVideoIndex}
                />
                
                {/* Controls in absolute position for mobile */}
                <div className="absolute -translate-x-[50%] -translate-y-[50%] top-1/2 right-0 z-10 interactive">
                  <VideoControls video={video} />
                </div>
                
                {/* Video info */}
                <div 
                  className="absolute left-0 p-4 z-10 interactive"
                  style={{
                    bottom: '77px',
                    paddingBottom: 'env(safe-area-inset-bottom, 0px)'
                  }}
                >
                  <VideoInfo video={video} />
                </div>
              </div>
            </div>
            
            {/* Desktop layout */}
            <div className="hidden md:flex h-full w-full px-4">
              <div className="flex h-full items-center justify-center mx-auto gap-8">
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-[400px] aspect-[9/16] rounded-lg overflow-hidden">
                    <VideoPlayer 
                      video={video} 
                      isActive={index === currentVideoIndex}
                    />
                  </div>
                  
                  <div className="mt-4 w-full max-w-[400px] px-2">
                    <VideoInfo video={video} />
                  </div>
                </div>
                
                <div className="flex flex-col justify-center">
                  <VideoControls video={video} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </animated.div>
      
      {/* Infinite scroll reference */}
      <div ref={bottomRef} className="h-1" />
      
      {/* Loading indicator */}
      {loading && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="animate-spin h-5 w-5 mr-2 border-2 border-primary border-t-transparent rounded-full"></div>
            <span className="text-sm text-white">กำลังโหลด...</span>
          </div>
        </div>
      )}
    </div>
  );
}