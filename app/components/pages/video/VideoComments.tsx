"use client";

import { useState, useEffect } from "react";
import { X, Send, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  likes: number;
  user: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
  };
}

interface VideoCommentsProps {
  videoId: string;
}

export default function VideoComments({ videoId }: VideoCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  
  // โหลดความเห็นเมื่อ component mount หรือ videoId เปลี่ยน
  useEffect(() => {
    loadComments();
  }, [videoId]);

  // จำลองการโหลดความเห็น
  const loadComments = () => {
    setLoading(true);
    
    // จำลองการเรียก API ด้วย setTimeout
    setTimeout(() => {
      const mockComments: Comment[] = [
        {
          id: "1",
          content: "วิดีโอนี้สวยมากครับ ชอบการถ่ายภาพและการเคลื่อนไหวของกล้อง",
          createdAt: "2025-06-14T10:30:00Z",
          likes: 24,
          user: {
            id: "user1",
            username: "user1",
            displayName: "ผู้ใช้ 1",
            avatar: "https://i.pravatar.cc/150?img=1"
          }
        },
        {
          id: "2",
          content: "ขอบคุณสำหรับการแชร์ประสบการณ์นี้ครับ",
          createdAt: "2025-06-14T11:15:00Z",
          likes: 12,
          user: {
            id: "user2",
            username: "user2",
            displayName: "ผู้ใช้ 2",
            avatar: "https://i.pravatar.cc/150?img=2"
          }
        },
        {
          id: "3",
          content: "อยากไปเที่ยวที่นี่บ้างจัง สวยมาก",
          createdAt: "2025-06-14T12:05:00Z",
          likes: 8,
          user: {
            id: "user3",
            username: "user3",
            displayName: "ผู้ใช้ 3",
            avatar: "https://i.pravatar.cc/150?img=3"
          }
        },
        {
          id: "4",
          content: "ถ่ายมาได้ดีมากๆ เลยครับ",
          createdAt: "2025-06-14T14:20:00Z",
          likes: 5,
          user: {
            id: "user4",
            username: "user4",
            displayName: "ผู้ใช้ 4",
            avatar: "https://i.pravatar.cc/150?img=4"
          }
        },
        {
          id: "5",
          content: "เพลงประกอบเพราะมากครับ ชื่ออะไรหรอครับ",
          createdAt: "2025-06-14T16:45:00Z",
          likes: 15,
          user: {
            id: "user5",
            username: "user5",
            displayName: "ผู้ใช้ 5",
            avatar: "https://i.pravatar.cc/150?img=5"
          }
        }
      ];
      
      setComments(mockComments);
      setLoading(false);
    }, 1000);
  };

  // จัดการการส่งความเห็นใหม่
  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    // สร้างความเห็นใหม่
    const newCommentObj: Comment = {
      id: `new-${Date.now()}`,
      content: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
      user: {
        id: "currentUser",
        username: "currentUser",
        displayName: "คุณ",
        avatar: "https://i.pravatar.cc/150?img=10"
      }
    };
    
    // เพิ่มความเห็นใหม่ไว้ด้านบนสุด
    setComments(prev => [newCommentObj, ...prev]);
    setNewComment("");
  };

  // แปลงวันที่เป็นรูปแบบ "X นาที/ชั่วโมง/วัน ที่แล้ว"
  const formatTimeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays} วันที่แล้ว`;
    }
    if (diffHours > 0) {
      return `${diffHours} ชม. ที่แล้ว`;
    }
    if (diffMins > 0) {
      return `${diffMins} นาทีที่แล้ว`;
    }
    
    return "เมื่อสักครู่";
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 flex items-center justify-between border-b">
        <h2 className="font-medium">ความคิดเห็น ({comments.length})</h2>
        <Button variant="ghost" size="icon" className="rounded-full">
          <X size={20} />
        </Button>
      </div>
      
      {/* Comments List */}
      <div className="flex-1 overflow-y-auto px-4 py-2">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin h-6 w-6 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={comment.user.avatar} alt={comment.user.displayName} />
                  <AvatarFallback>{comment.user.displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{comment.user.displayName}</span>
                    <span className="text-xs text-muted-foreground">{formatTimeAgo(comment.createdAt)}</span>
                  </div>
                  
                  <p className="text-sm mt-1">{comment.content}</p>
                  
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-xs text-muted-foreground">
                      <ThumbsUp size={14} />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="text-xs text-muted-foreground">ตอบกลับ</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Comment Input */}
      <div className="px-4 py-3 border-t">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150?img=10" alt="คุณ" />
            <AvatarFallback>คุณ</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 flex items-center border rounded-full overflow-hidden bg-muted">
            <Input
              className="flex-1 border-0 bg-transparent py-2 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="เพิ่มความคิดเห็น..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmitComment();
                }
              }}
            />
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-full aspect-square rounded-none"
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
            >
              <Send size={18} className={newComment.trim() ? 'text-primary' : 'text-muted-foreground'} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}