// src/components/globals/TipTapEditor.tsx (Updated)
'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Link } from '@tiptap/extension-link';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import { Underline } from '@tiptap/extension-underline';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Highlight } from '@tiptap/extension-highlight';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowUp } from 'lucide-react';

import { EditorToolbar } from './EditorToolbar';
import { LinkDialog } from './LinkDialog';
import { ImageUploadDialog } from './ImageUploadDialog';
import { EnhancedImage } from './EnhancedImage'; // Import our enhanced image

import type { TipTapEditorProps, LinkData, ImageInfo } from '@/types/editor';
import { DEFAULT_EDITOR_PLACEHOLDER, EDITOR_EXTENSIONS_CONFIG } from '@/constants/editor';

// Import CSS
import './TipTapEditor.css';

interface ImageUploadData {
  url: string;
  alt?: string;
  title?: string;
  imageInfo?: ImageInfo;
}

const TipTapEditor: React.FC<TipTapEditorProps> = ({
  value,
  onChange,
  readOnly = false,
  placeholder = DEFAULT_EDITOR_PLACEHOLDER,
  className
}) => {
  const [isClient, setIsClient] = useState(false);
  const isParentDisabled = useRef(false);

  // Refs for elements
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorContentRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);

  // State for toolbar positioning
  const [isToolbarSticky, setIsToolbarSticky] = useState(false);
  const [toolbarHeight, setToolbarHeight] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isContainerScroll, setIsContainerScroll] = useState(false);

  // State for dialogs
  const [mediaDialogOpen, setMediaDialogOpen] = useState(false);
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [currentLinkData, setCurrentLinkData] = useState<LinkData | undefined>();

  const [isInternalUpdate, setIsInternalUpdate] = useState(false);
  const lastValueRef = useRef(value);

  
  const debouncedOnChange = useCallback((content: string) => {
    if (!isInternalUpdate) { // ป้องกันการ update เมื่อเราเพิ่ง setContent
      setTimeout(() => {
        onChange(content);
      }, 0);
    }
  }, [onChange, isInternalUpdate]);


  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // ปิด extensions ที่เราจะใช้ custom version
        link: false,
        underline: false, // ปิด underline ของ StarterKit ด้วย
      }),
      EnhancedImage.configure(EDITOR_EXTENSIONS_CONFIG.image),
      Link.configure(EDITOR_EXTENSIONS_CONFIG.link), // ใช้ custom link
      Underline, // เพิ่ม underline แยก
      Placeholder.configure({ placeholder }),
      TextAlign.configure(EDITOR_EXTENSIONS_CONFIG.textAlign),
      TextStyle,
      Color,
      Highlight.configure(EDITOR_EXTENSIONS_CONFIG.highlight),
      Table.configure(EDITOR_EXTENSIONS_CONFIG.table),
      TableRow.configure(EDITOR_EXTENSIONS_CONFIG.tableRow),
      TableHeader.configure(EDITOR_EXTENSIONS_CONFIG.tableHeader),
      TableCell.configure(EDITOR_EXTENSIONS_CONFIG.tableCell),
    ],
    content: value,
    editable: !readOnly,
    immediatelyRender: false, // Fix SSR hydration issue
    onUpdate: ({ editor }) => {
      debouncedOnChange(editor.getHTML());
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  

  const checkParentDisabled = useCallback(() => {
    if (editorContainerRef.current) {
      const parent = editorContainerRef.current.parentElement;
      if (parent) {
        const style = window.getComputedStyle(parent);
        isParentDisabled.current = style.pointerEvents === 'none' || parseFloat(style.opacity) < 1;
      }
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Calculate toolbar height
    if (!readOnly && toolbarRef.current) {
      setToolbarHeight(toolbarRef.current.offsetHeight);
    }

    // Calculate header height
    const calculateHeaderHeight = () => {
      // Try to find header element by different selectors
      const headerSelectors = [
        'header[class*="fixed"]',
        'header[class*="sticky"]',
        'nav[class*="fixed"]',
        'nav[class*="sticky"]',
        '.header',
        '.navbar',
        '[data-header]'
      ];

      let header = null;
      for (const selector of headerSelectors) {
        header = document.querySelector(selector);
        if (header) break;
      }

      if (header) {
        const rect = header.getBoundingClientRect();
        setHeaderHeight(rect.height);
      } else {
        // Default header height if not found (64px is common)
        setHeaderHeight(64);
      }
    };

    calculateHeaderHeight();

    checkParentDisabled();

    const scrollableContainer = editorContentRef.current?.parentElement;
    let containerHasScroll = false;

    if (scrollableContainer) {
      const style = window.getComputedStyle(scrollableContainer);
      const hasOverflowY = style.overflowY === 'auto' || style.overflowY === 'scroll';
      const hasScrollContent = scrollableContainer.scrollHeight > scrollableContainer.clientHeight;

      containerHasScroll = hasOverflowY && hasScrollContent;
      setIsContainerScroll(containerHasScroll);
    }

    const handleContainerScroll = () => {
      if (isParentDisabled.current || !scrollableContainer) return;

      const scrollTop = scrollableContainer.scrollTop;
      const shouldBeSticky = scrollTop > 10;

      setIsToolbarSticky(shouldBeSticky);
      setShowScrollToTop(scrollTop > 300);
    };

    const handleWindowScroll = () => {
      if (isParentDisabled.current || !editorContainerRef.current) return;

      const editorRect = editorContainerRef.current.getBoundingClientRect();
      const shouldBeSticky = editorRect.top < headerHeight && editorRect.bottom > (toolbarHeight + headerHeight);

      setIsToolbarSticky(shouldBeSticky);
      setShowScrollToTop(window.scrollY > 300);
    };

    if (containerHasScroll && scrollableContainer) {
      scrollableContainer.addEventListener('scroll', handleContainerScroll);
    } else {
      window.addEventListener('scroll', handleWindowScroll);
    }

    return () => {
      if (containerHasScroll && scrollableContainer) {
        scrollableContainer.removeEventListener('scroll', handleContainerScroll);
      } else {
        window.removeEventListener('scroll', handleWindowScroll);
      }
    };
  }, [readOnly, toolbarHeight, headerHeight, isClient, checkParentDisabled]);

  useEffect(() => {
    if (editor && value !== lastValueRef.current) {
      const currentContent = editor.getHTML();
      
      if (currentContent !== value) {
        setIsInternalUpdate(true);
        
        // ใช้ requestAnimationFrame เพื่อรอให้ render เสร็จก่อน
        requestAnimationFrame(() => {
          editor.commands.setContent(value, { parseOptions: { preserveWhitespace: 'full' } }); // false = ไม่ trigger onUpdate
          setIsInternalUpdate(false);
        });
      }
      
      lastValueRef.current = value;
    }
  }, [value, editor]);

  // Updated to handle the new image data structure
  const handleImageSelected = useCallback((data: ImageUploadData) => {
    if (data.url && editor) {
      editor.chain().focus().setImage({
        src: data.url,
        alt: data.alt || '',
        title: data.title || '',
        alignment: 'center', // Default alignment
        float: 'none' // Default float
      }).run();
    }
  }, [editor]);

  const handleLinkClick = useCallback(() => {
    if (!editor) return;

    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);
    const linkAttrs = editor.getAttributes('link');

    if (linkAttrs.href) {
      const currentRel = linkAttrs.rel ? linkAttrs.rel.split(' ') : [];
      setCurrentLinkData({
        href: linkAttrs.href,
        text: selectedText,
        target: linkAttrs.target || '_self',
        rel: currentRel
      });
    } else {
      setCurrentLinkData({
        href: '',
        text: selectedText,
        target: '_self',
        rel: []
      });
    }

    setLinkDialogOpen(true);
  }, [editor]);

  const handleLinkSave = useCallback((linkData: LinkData) => {
    if (!editor) return;

    const relString = linkData.rel.length > 0 ? linkData.rel.join(' ') : null;
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);

    if (linkData.text && linkData.text !== selectedText && selectedText) {
      editor.chain().focus().deleteSelection().insertContent(linkData.text).run();
      editor.commands.setTextSelection({
        from,
        to: from + linkData.text.length
      });
    } else if (linkData.text && !selectedText) {
      editor.chain().focus().insertContent(linkData.text).run();
      editor.commands.setTextSelection({
        from: editor.state.selection.from - linkData.text.length,
        to: editor.state.selection.from
      });
    }

    const linkAttrs: Record<string, string> = { href: linkData.href };
    if (linkData.target === '_blank') {
      linkAttrs.target = '_blank';
    }
    if (relString) {
      linkAttrs.rel = relString;
    }

    editor.chain().focus().extendMarkRange('link').setLink(linkAttrs as { href: string; target?: string | null | undefined; rel?: string | null | undefined; class?: string | null | undefined; }).run();
  }, [editor]);

  const handleTableAdd = useCallback(() => {
    if (editor) {
      editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    }
  }, [editor]);

  const handleTableDelete = useCallback(() => {
    if (editor) {
      editor.chain().focus().deleteTable().run();
    }
  }, [editor]);

  const scrollToTop = useCallback(() => {
    if (isContainerScroll) {
      const scrollableContainer = editorContentRef.current?.parentElement;
      if (scrollableContainer) {
        scrollableContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const editorTop = editorContainerRef.current?.getBoundingClientRect().top || 0;
      const offsetTop = window.pageYOffset + editorTop - toolbarHeight - headerHeight;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  }, [isContainerScroll, toolbarHeight, headerHeight]);

  if (!isClient || !editor) {
    return (
      <div className={cn("editor-loading", className)}>
        <p className="loading-text">กำลังโหลด Editor...</p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div
        ref={editorContainerRef}
        className={cn(
          "text-foreground border border-border rounded-lg overflow-hidden relative flex flex-col h-full",
          "prose-sm prose-gray dark:prose-invert max-w-none",
          className
        )}
      >
        {!readOnly && (
          <div
            style={{
              position: isToolbarSticky && !isParentDisabled.current
                ? (isContainerScroll ? 'sticky' : 'fixed')
                : 'relative',
              top: isContainerScroll ? 0 : isToolbarSticky ? `${headerHeight}px` : 'auto',
              left: isContainerScroll ? 'auto' : (isToolbarSticky ? editorContainerRef.current?.getBoundingClientRect().left + 'px' : 'auto'),
              width: isContainerScroll ? '100%' : (isToolbarSticky ? editorContainerRef.current?.offsetWidth + 'px' : '100%'),
              zIndex: 40,
            }}
            className={cn(
              "tiptap-toolbar",
              isToolbarSticky && "tiptap-toolbar-sticky"
            )}
          >
            <div ref={toolbarRef}>
              <EditorToolbar
                editor={editor}
                onLinkClick={handleLinkClick}
                onImageClick={() => setMediaDialogOpen(true)}
                onTableAdd={handleTableAdd}
                onTableDelete={handleTableDelete}
              />
            </div>
          </div>
        )}

        {/* Add spacer when toolbar is fixed */}
        {isToolbarSticky && !isContainerScroll && (
          <div style={{ height: toolbarHeight }} />
        )}

        <div
          ref={editorContentRef}
          className="p-4 flex-1 overflow-y-auto bg-background relative"
        >
          <EditorContent editor={editor} />

          {/* Scroll to Top Button */}
          {showScrollToTop && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="editor-scroll-top sticky bottom-4 float-right"
                  onClick={scrollToTop}
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Scroll to top</TooltipContent>
            </Tooltip>
          )}
        </div>

        {/* Updated Image Upload Dialog */}
        <ImageUploadDialog
          open={mediaDialogOpen}
          onOpenChange={setMediaDialogOpen}
          onImageUploaded={handleImageSelected}
        />

        {/* Link Dialog */}
        <LinkDialog
          open={linkDialogOpen}
          onOpenChange={setLinkDialogOpen}
          onSave={handleLinkSave}
          initialData={currentLinkData}
        />
      </div>
    </TooltipProvider>
  );
};

export default TipTapEditor;