// types/models/file.ts

/**
 * File Path Type
 * Indicates how the file path was generated
 */
export type FilePathType = 'custom' | 'structured';

/**
 * File Model
 * Represents an uploaded file
 */
export interface File {
  id: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  cdnPath: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
