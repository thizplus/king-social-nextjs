// components/pages/topic/ReplyItem.tsx
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
  AlertTriangle
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

import type { Reply } from '@/types/models/reply';

interface ReplyItemProps {
  reply: Reply;
  currentUserId?: string;
  onReplyUpdate?: (replyId: string, newContent: string) => void;
  onReplyDelete?: (replyId: string) => void;
}

export function ReplyItem({
  reply,
  currentUserId,
  onReplyUpdate,
  onReplyDelete
}: ReplyItemProps) {
  const { updateReply, deleteReply, isUpdating, isDeleting } = useReply();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(reply.content);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // Default to 0 as Reply model doesn't have likeCount

  // Check permissions
  const isOwner = currentUserId && reply.userId === currentUserId;
  const canEdit = isOwner && !isDeleting(reply.id);
  const canDelete = isOwner && !isUpdating(reply.id);

  // Get display name
  const displayName = reply.user ?
    (reply.user.displayName || `${reply.user.firstName} ${reply.user.lastName}`.trim() || reply.user.username || 'ผู้ใช้ไม่ระบุชื่อ')
    : 'ผู้ใช้ไม่ระบุชื่อ';

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
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
    // Error handling is managed by the hook
  };

  const handleDelete = async () => {
    const result = await deleteReply(reply.id);

    if (result.success) {
      onReplyDelete?.(reply.id);
    }
    setShowDeleteDialog(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleEditSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleEditCancel();
    }
  };

  return (
    <>
      <div className="space-y-3">
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
                  className={cn(
                    "text-muted-foreground hover:text-foreground",
                    isLiked && "text-red-500 hover:text-red-600"
                  )}
                >
                  <Heart
                    size={14}
                    className={cn("", isLiked && "fill-current")}
                  />
                  {likeCount > 0 ? likeCount : "ถูกใจ"}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ReplyIcon size={14} className="mr-1" />
                  ตอบกลับ
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบความคิดเห็น</AlertDialogTitle>
            <AlertDialogDescription>
              คุณแน่ใจหรือไม่ว่าต้องการลบความคิดเห็นนี้? การดำเนินการนี้ไม่สามารถยกเลิกได้
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