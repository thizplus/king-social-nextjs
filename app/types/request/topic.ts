// types/request/topic.ts

/**
 * Create Topic Request
 * Data required to create a new topic
 */
export interface CreateTopicRequest {
  forumId: string;
  title: string;
  content: string;
  thumbnail?: string;
}

/**
 * Update Topic Request
 * Data to update an existing topic
 */
export interface UpdateTopicRequest {
  title?: string;
  content?: string;
  thumbnail?: string;
}
