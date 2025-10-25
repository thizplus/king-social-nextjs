// components/pages/topic/NestedReplyItem.tsx
"use client"

import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { th } from 'date-fns/locale';
import {
  Heart,
  Reply as ReplyIcon,
  MoreHorizontal,
  User,
  Clock,
  Edit,
  Trash2,
  Check,
  X,
  AlertTriangle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useReply } from '@/hooks/useReply';
import { useTopic } from '@/hooks/useTopic';
import { useReplyLike } from '@/hooks/useLike';
import type { Reply } from '@/types/models/reply';

interface NestedReplyItemProps {
  reply: Reply;
  topicId: string;
  currentUserId?: string;
  onReplyUpdate?: (replyId: string, newContent: string) => void;
  onReplyDelete?: (replyId: string) => void;
  onNestedReplyCreate?: (parentId: string, newReply: Reply) => void;
  level?: number; // For limiting nesting depth
  maxLevel?: number; // Maximum nesting level
}

export function NestedReplyItem({
  reply,
  topicId,
  currentUserId,
  onReplyUpdate,
  onReplyDelete,
  onNestedReplyCreate,
  level = 0,
  maxLevel = 3
}: NestedReplyItemProps) {
  const { updateReply, deleteReply, isUpdating, isDeleting } = useReply();
  const { createReply } = useTopic();

  // States
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reply.content);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [newReplyContent, setNewReplyContent] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);
  const [showNestedReplies, setShowNestedReplies] = useState(true);

  // Use reply like hook
  const {
    isLiked,
    likeCount,
    isToggling,
    toggleLike,
    // error: likeError // Commented out unused variable
  } = useReplyLike(reply.id, { autoFetch: true });

  // Check permissions
  const isOwner = currentUserId && reply.userId === currentUserId;
  const canEdit = isOwner && !isDeleting(reply.id);
  const canDelete = isOwner && !isUpdating(reply.id);
  const canReply = level < maxLevel; // Limit nesting depth

  // Get display name
  const displayName = reply.user ?
    (reply.user.displayName || `${reply.user.firstName} ${reply.user.lastName}`.trim() || reply.user.username || 'ผู้ใช้ไม่ระบุชื่อ')
    : 'ผู้ใช้ไม่ระบุชื่อ';

  const handleLike = async () => {
    if (isToggling) return; // Prevent multiple clicks
    await toggleLike(reply.id);
  };

  const handleEditStart = () => {
    setEditContent(reply.content);
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setEditContent(reply.content);
    setIsEditing(false);
  };

  const handleEditSave = async () => {
    if (editContent.trim() === reply.content.trim()) {
      setIsEditing(false);
      return;
    }

    const result = await updateReply(reply.id, { content: editContent.trim() });

    if (result.success && result.reply) {
      setIsEditing(false);
      onReplyUpdate?.(reply.id, result.reply.content);
    }
  };

  const handleDelete = async () => {
    const result = await deleteReply(reply.id);

    if (result.success) {
      onReplyDelete?.(reply.id);
    }
    setShowDeleteDialog(false);
  };

  const handleReplySubmit = async () => {
    if (!newReplyContent.trim()) return;

    setSubmittingReply(true);
    try {
      const response = await createReply(topicId, newReplyContent.trim(), reply.id);

      if (response.success && response.reply) {
        onNestedReplyCreate?.(reply.id, response.reply);
        setNewReplyContent('');
        setShowReplyForm(false);
      }
    } catch (error) {
      console.error('Failed to create nested reply:', error);
    } finally {
      setSubmittingReply(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (isEditing) {
        handleEditSave();
      } else if (showReplyForm) {
        handleReplySubmit();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      if (isEditing) {
        handleEditCancel();
      } else if (showReplyForm) {
        setShowReplyForm(false);
        setNewReplyContent('');
      }
    }
  };

  const nestedReplies = reply.replies || [];
  const hasNestedReplies = nestedReplies.length > 0;

  return (
    <>
      <div className={cn(
        "space-y-3",
        level > 0 && "ml-8 pl-4 border-l-2 border-border"
      )}>
        <div className="flex items-start space-x-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage
              src={reply.user?.avatar || undefined}
              alt={displayName}
            />
            <AvatarFallback>
              <User size={16} />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <p className="font-medium text-sm truncate">{displayName}</p>
                {reply.createdAt !== reply.updatedAt && (
                  <span className="text-xs text-muted-foreground">(แก้ไขแล้ว)</span>
                )}
                {level > 0 && (
                  <span className="text-xs text-muted-foreground">
                    • ตอบกลับ
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock size={12} className="mr-1" />
                  {reply.createdAt && new Date(reply.createdAt).getTime() ? (
                    formatDistanceToNow(new Date(reply.createdAt), {
                      addSuffix: true,
                      locale: th
                    })
                  ) : (
                    'เมื่อไหร่ก็ได้'
                  )}
                </div>

                {(canEdit || canDelete) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={isUpdating(reply.id) || isDeleting(reply.id)}
                      >
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {canEdit && (
                        <DropdownMenuItem onClick={handleEditStart}>
                          <Edit size={14} className="mr-2" />
                          แก้ไข
                        </DropdownMenuItem>
                      )}
                      {canDelete && (
                        <>
                          {canEdit && <DropdownMenuSeparator />}
                          <DropdownMenuItem
                            onClick={() => setShowDeleteDialog(true)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 size={14} className="mr-2" />
                            ลบ
                          </DropdownMenuItem>
                        </>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <AlertTriangle size={14} className="mr-2" />
                        รายงาน
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>

            {/* Content */}
            {isEditing ? (
              <div className="space-y-3">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="min-h-[80px] resize-none"
                  placeholder="แก้ไขความคิดเห็น..."
                  disabled={isUpdating(reply.id)}
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    กด Ctrl+Enter เพื่อบันทึก หรือ Esc เพื่อยกเลิก
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditCancel}
                      disabled={isUpdating(reply.id)}
                    >
                      <X size={14} className="mr-1" />
                      ยกเลิก
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleEditSave}
                      disabled={isUpdating(reply.id) || !editContent.trim() || editContent.trim() === reply.content.trim()}
                    >
                      {isUpdating(reply.id) ? (
                        'กำลังบันทึก...'
                      ) : (
                        <>
                          <Check size={14} className="mr-1" />
                          บันทึก
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {reply.content}
                </p>
              </div>
            )}

            {/* Actions */}
            {!isEditing && (
              <div className="flex items-center space-x-4 pt-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  disabled={isToggling}
                  className={cn(
                    "text-muted-foreground hover:text-foreground",
                    isLiked && "text-primary hover:text-primary",
                    isToggling && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Heart
                    size={14}
                    className={cn("", isLiked && "fill-current")}
                  />
                  {likeCount > 0 ? likeCount : "ถูกใจ"}
                </Button>

                {canReply && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowReplyForm(!showReplyForm)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <ReplyIcon size={14} className="mr-1" />
                    ตอบกลับ
                  </Button>
                )}

                {hasNestedReplies && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowNestedReplies(!showNestedReplies)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showNestedReplies ? (
                      <ChevronUp size={14} className="mr-1" />
                    ) : (
                      <ChevronDown size={14} className="mr-1" />
                    )}
                    {nestedReplies.length} ตอบกลับ
                  </Button>
                )}
              </div>
            )}

            {/* Reply Form */}
            {showReplyForm && (
              <div className="space-y-3 mt-3 p-3 bg-muted/30 rounded-lg">
                <Textarea
                  value={newReplyContent}
                  onChange={(e) => setNewReplyContent(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={`ตอบกลับ ${displayName}...`}
                  className="min-h-[80px] resize-none"
                  disabled={submittingReply}
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    กด Ctrl+Enter เพื่อส่ง หรือ Esc เพื่อยกเลิก
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowReplyForm(false);
                        setNewReplyContent('');
                      }}
                      disabled={submittingReply}
                    >
                      ยกเลิก
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleReplySubmit}
                      disabled={submittingReply || !newReplyContent.trim()}
                    >
                      {submittingReply ? 'กำลังส่ง...' : 'ส่งตอบกลับ'}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Nested Replies */}
        {hasNestedReplies && showNestedReplies && (
          <div className="space-y-4">
            {nestedReplies.map((nestedReply) => (
              <NestedReplyItem
                key={nestedReply.id}
                reply={nestedReply}
                topicId={topicId}
                currentUserId={currentUserId}
                onReplyUpdate={onReplyUpdate}
                onReplyDelete={onReplyDelete}
                onNestedReplyCreate={onNestedReplyCreate}
                level={level + 1}
                maxLevel={maxLevel}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบความคิดเห็น</AlertDialogTitle>
            <AlertDialogDescription>
              คุณแน่ใจหรือไม่ว่าต้องการลบความคิดเห็นนี้?
              {hasNestedReplies && ' ความคิดเห็นย่อยทั้งหมดจะถูกลบด้วย'}
              การดำเนินการนี้ไม่สามารถยกเลิกได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting(reply.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting(reply.id) ? 'กำลังลบ...' : 'ลบ'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}