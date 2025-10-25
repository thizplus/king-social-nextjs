// types/editor.ts
import { Editor } from '@tiptap/react';

export interface TipTapEditorProps {
  value: string;
  onChange: (content: string) => void;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
}

export interface EditorToolbarProps {
  editor: Editor | null;
  onLinkClick: () => void;
  onImageClick: () => void;
  onTableAdd: () => void;
  onTableDelete: () => void;
}

export interface LinkData {
  href: string;
  text: string;
  target: '_self' | '_blank';
  rel: string[];
}

export interface ImageInfo {
  width?: number;
  height?: number;
  size?: number;
  format?: string;
  url?: string;
}

export interface LinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (linkData: LinkData) => void;
  initialData?: LinkData;
}