// components/pages/topic/TopicReplies.tsx
"use client"

import { useState, useEffect } from 'react';
import {
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ReplyIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { NestedReplyItem } from './NestedReplyItem';
import { useTopic } from '@/hooks/useTopic';
// import { cn } from '@/lib/utils'; // Commented out unused import
import type { Reply } from '@/types/models/reply';

// Note: Reply interface imported from types/models/reply

interface TopicRepliesProps {
  topicId: string;
  onReplyFormToggle?: (isOpen: boolean) => void;
  openReplyForm?: boolean;
}

export function TopicReplies({ topicId, onReplyFormToggle, openReplyForm }: TopicRepliesProps) {
  const { fetchTopicReplies, createReply } = useTopic();
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReply, setNewReply] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);

  // Mock current user - replace with actual auth
  const currentUserId = 'user1';

  // Build nested reply structure
  const buildNestedReplies = (replies: Reply[]): Reply[] => {
    const replyMap: Record<string, Reply> = {};
    const topLevelReplies: Reply[] = [];

    // First pass: create a map of all replies
    replies.forEach(reply => {
      replyMap[reply.id] = { ...reply, replies: [] };
    });

    // Second pass: build the nested structure
    replies.forEach(reply => {
      if (reply.parentId && replyMap[reply.parentId]) {
        // This is a nested reply
        replyMap[reply.parentId].replies!.push(replyMap[reply.id]);
      } else {
        // This is a top-level reply
        topLevelReplies.push(replyMap[reply.id]);
      }
    });

    return topLevelReplies;
  };

  // Load replies using real API
  useEffect(() => {
    const loadReplies = async () => {
      try {
        setLoading(true);
        const response = await fetchTopicReplies(topicId);

        if (response.success && response.replies) {
          console.log('API Response replies:', response.replies);

          // Check if replies are already nested or flat
          const hasNestedStructure = response.replies.some(reply => reply.replies && reply.replies.length > 0);

          if (hasNestedStructure) {
            // API already returns nested structure
            console.log('Using nested structure from API');
            setReplies(response.replies);
          } else {
            // Build nested structure from flat reply list
            console.log('Building nested structure from flat array');
            const nestedReplies = buildNestedReplies(response.replies);
            setReplies(nestedReplies);
          }
        } else {
          console.error('Failed to load replies:', response.error);
          setReplies([]);
        }
      } catch (error) {
        console.error('Error loading replies:', error);
        setReplies([]);
      } finally {
        setLoading(false);
      }
    };

    loadReplies();
  }, [topicId, fetchTopicReplies]);

  // Sync with external openReplyForm prop
  useEffect(() => {
    if (openReplyForm !== undefined && openReplyForm !== showReplyForm) {
      setShowReplyForm(openReplyForm);
    }
  }, [openReplyForm, showReplyForm]);

  // Recursive function to update a reply in nested structure
  const updateReplyInTree = (replies: Reply[], replyId: string, newContent: string): Reply[] => {
    return replies.map(reply => {
      if (reply.id === replyId) {
        return { ...reply, content: newContent, updatedAt: new Date().toISOString() };
      } else if (reply.replies && reply.replies.length > 0) {
        return {
          ...reply,
          replies: updateReplyInTree(reply.replies, replyId, newContent)
        };
      }
      return reply;
    });
  };

  // Recursive function to delete a reply from nested structure
  const deleteReplyFromTree = (replies: Reply[], replyId: string): Reply[] => {
    return replies
      .filter(reply => reply.id !== replyId)
      .map(reply => {
        if (reply.replies && reply.replies.length > 0) {
          return {
            ...reply,
            replies: deleteReplyFromTree(reply.replies, replyId)
          };
        }
        return reply;
      });
  };

  const handleReplyUpdate = (replyId: string, newContent: string) => {
    setReplies(prev => updateReplyInTree(prev, replyId, newContent));
  };

  const handleReplyDelete = (replyId: string) => {
    setReplies(prev => deleteReplyFromTree(prev, replyId));
  };

  // Recursive function to add a nested reply
  const addNestedReplyToTree = (replies: Reply[], parentId: string, newReply: Reply): Reply[] => {
    return replies.map(reply => {
      if (reply.id === parentId) {
        return {
          ...reply,
          replies: [...(reply.replies || []), { ...newReply, replies: [] }]
        };
      } else if (reply.replies && reply.replies.length > 0) {
        return {
          ...reply,
          replies: addNestedReplyToTree(reply.replies, parentId, newReply)
        };
      }
      return reply;
    });
  };

  const handleNestedReplyCreate = (parentId: string, newReply: Reply) => {
    setReplies(prev => addNestedReplyToTree(prev, parentId, newReply));
  };

  const handleSubmitReply = async () => {
    if (!newReply.trim()) return;

    setSubmitting(true);
    try {
      const response = await createReply(topicId, newReply.trim());

      if (response.success && response.reply) {
        // Add new top-level reply to the list
        setReplies(prev => [...prev, { ...response.reply, replies: [] }]);
        setNewReply('');
        setShowReplyForm(false);
        onReplyFormToggle?.(false);
      } else {
        console.error('Failed to create reply:', response.error);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error('Error creating reply:', error);
      // You might want to show an error message to the user here
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare size={20} />
            ความคิดเห็น
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 bg-muted rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4"></div>
                    <div className="h-4 bg-muted rounded w-full"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} />
            ความคิดเห็น ({replies.length})
          </div>
          <Button
            onClick={() => {
              const newState = !showReplyForm;
              setShowReplyForm(newState);
              onReplyFormToggle?.(newState);
            }}
            variant="outline"
            size="sm"
          >
            <ReplyIcon size={16} className="mr-2" />
            ตอบกลับ
            {showReplyForm ? (
              <ChevronUp size={16} className="ml-2" />
            ) : (
              <ChevronDown size={16} className="ml-2" />
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Reply Form */}
          {showReplyForm && (
            <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
              <Textarea
                placeholder="แสดงความคิดเห็น..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowReplyForm(false);
                    setNewReply('');
                    onReplyFormToggle?.(false);
                  }}
                >
                  ยกเลิก
                </Button>
                <Button
                  onClick={handleSubmitReply}
                  disabled={!newReply.trim() || submitting}
                >
                  {submitting ? 'กำลังส่ง...' : 'ส่งความคิดเห็น'}
                </Button>
              </div>
            </div>
          )}

          {/* Replies List */}
          {replies.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
              <p>ยังไม่มีความคิดเห็น</p>
              <p className="text-sm">เป็นคนแรกที่แสดงความคิดเห็น!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {replies.map((reply) => (
                <NestedReplyItem
                  key={reply.id}
                  reply={reply}
                  topicId={topicId}
                  currentUserId={currentUserId}
                  onReplyUpdate={handleReplyUpdate}
                  onReplyDelete={handleReplyDelete}
                  onNestedReplyCreate={handleNestedReplyCreate}
                  level={0}
                  maxLevel={3}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}