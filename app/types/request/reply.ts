// types/request/reply.ts

/**
 * Create Reply Request
 * Data required to create a reply to a topic
 */
export interface CreateReplyRequest {
  content: string;
  parentId?: string | null;
}

/**
 * Update Reply Request
 * Data to update an existing reply
 */
export interface UpdateReplyRequest {
  content: string;
}
