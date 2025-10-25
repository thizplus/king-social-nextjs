// types/request/file.ts

/**
 * Upload File Request
 * Data for file upload (sent as form data)
 */
export interface UploadFileRequest {
  customPath?: string;
  category?: string;
  entityId?: string;
  fileType?: string;
}

/**
 * File Filter Request
 * Query params to filter files
 */
export interface FileFilterRequest {
  mimeType?: string;
  userId?: string;
  limit?: number;
  offset?: number;
}

/**
 * Delete File Request
 * Request to delete a file
 */
export interface DeleteFileRequest {
  fileId: string;
}
