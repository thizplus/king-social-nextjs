// types/response/file.ts

import type { File, FilePathType } from '../models/file';
import type { PaginationMeta } from '../common';

/**
 * File Response
 * Single file data response
 */
export type FileResponse = File;

/**
 * File List Response
 * Paginated list of files
 */
export interface FileListResponse {
  files: FileResponse[];
  meta: PaginationMeta;
}

/**
 * Upload Response
 * Response after successful file upload
 */
export interface UploadResponse {
  fileId: string;
  fileName: string;
  url: string;
  cdnPath: string;
  fileSize: number;
  mimeType: string;
  pathType: FilePathType;
}

/**
 * Delete File Response
 * Response after successful file deletion
 */
export interface DeleteFileResponse {
  message: string;
  fileId: string;
}
