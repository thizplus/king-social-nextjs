"use client";

import { useState } from "react";
import Link from "next/link";
import {  ChevronDown, ChevronUp } from "lucide-react";
import { Video } from "@/types/models/video";

interface VideoInfoProps {
  video: Video
}

export default function VideoInfo({ video }: VideoInfoProps) {
  const [expanded, setExpanded] = useState(false);
  
  // สลับการแสดงข้อมูลเพิ่มเติม
  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="w-full">
      {/* User Info & Title */}
      <div className="flex flex-col">
        <Link href={`/profile/${video.user?.username || 'unknown'}`} className="font-medium text-white mb-1">
          @{video.user?.username || 'unknown'}
        </Link>
        
        {/* Video Title & Description */}
        <div 
          className={`${expanded ? '' : 'line-clamp-2'} text-white/90 text-sm mb-2`}
          onClick={toggleExpand}
        >
          {video.title && <span className="font-medium mr-2">{video.title}</span>}
          {video.description}
        </div>
        
        {/* Expand/Collapse Button (show only if description is long) */}
        {(video.description && video.description.length > 80) && (
          <button 
            className="text-white/70 text-xs flex items-center"
            onClick={toggleExpand}
          >
            {expanded ? (
              <>
                <span className="mr-1">แสดงน้อยลง</span>
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                <span className="mr-1">อ่านเพิ่มเติม</span>
                <ChevronDown size={14} />
              </>
            )}
          </button>
        )}
      </div>
      
      {/* Music/Sound Info */}
    
      
      {/* Tags - Commented out as Video interface doesn't have tags */}
      {/* {video.tags && video.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {video.tags.map((tag, index) => (
            <Link
              key={index}
              href={`/tag/${tag}`}
              className="text-primary text-sm hover:underline"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )} */}
    </div>
  );
}