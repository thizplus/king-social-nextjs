"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
  video: {
    id: string;
    videoUrl: string;
    title?: string;
  };
  isActive: boolean;
}

export default function VideoPlayer({ video, isActive }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { ref: videoContainerRef, inView } = useInView({
    threshold: 0.6, // วิดีโอต้องแสดงอยู่ในหน้าจอ 60% ขึ้นไป
  });
  
  // Reset loading state when video changes
  useEffect(() => {
    setIsLoading(true);
  }, [video.videoUrl]);
  
  // เมื่อวิดีโอเปลี่ยนสถานะ active หรือ inView
  useEffect(() => {
    if (videoRef.current) {
      if (isActive && inView) {
        videoRef.current.play().catch(() => {
          // Auto-play was prevented by browser
          console.log("Auto-play was prevented by browser");
        });
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
        // ถ้าไม่ active กลับไปที่จุดเริ่มต้นของวิดีโอ
        if (!isActive) {
          videoRef.current.currentTime = 0;
        }
      }
    }
  }, [isActive, inView]);

  // จัดการเมื่อคลิกที่วิดีโอ (เล่น/หยุด)
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(e => console.log(e));
        setIsPlaying(true);
      }
    }
  };

  // สลับสถานะเสียง
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  // จัดการเมื่อวิดีโอโหลดเสร็จ - ใช้หลาย events เพื่อให้แน่ใจ
  const handleVideoReady = () => {
    setIsLoading(false);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const handlePlaying = () => {
    setIsLoading(false);
  };

  return (
    <div 
      ref={videoContainerRef}
      className="h-full w-full bg-black flex items-center justify-center relative" 
      onClick={togglePlay}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
      
      {/* Video Element */}
      <video
        ref={videoRef}
        src={video.videoUrl}
       className="h-full w-full object-contain border-0 md:border md:border-gray-700/50 md:rounded-lg"
        loop
        playsInline
        muted={isMuted}
        preload="auto"
        onLoadedData={handleVideoReady}
        onCanPlay={handleCanPlay}
        onCanPlayThrough={handleVideoReady}
        onLoadStart={handleLoadStart}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onSuspend={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
      />
      
      {/* Play/Pause Indicator */}
      
      
      {/* Volume Control */}
      <div className="absolute top-4 right-4 z-20">
        <button 
          className="bg-black/30 text-white rounded-full p-2 backdrop-blur-sm"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>
    </div>
  );
}