// src/components/globals/editor/EnhancedImage.ts
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import ImageNodeView from './ImageNodeView';

export interface ImageOptions {
  inline: boolean;
  allowBase64: boolean;
  HTMLAttributes: Record<string, string>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    enhancedImage: {
      setImage: (options: {
        src: string;
        alt?: string;
        title?: string;
        width?: string | number;
        height?: string | number;
        alignment?: 'left' | 'center' | 'right';
        float?: 'left' | 'right' | 'none';
      }) => ReturnType;
    };
  }
}

export const EnhancedImage = Node.create<ImageOptions>({
  name: 'enhancedImage',

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? 'inline' : 'block';
  },

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
      height: {
        default: null,
      },
      alignment: {
        default: 'center',
        renderHTML: attributes => {
          if (!attributes.alignment) return {};
          return {
            'data-alignment': attributes.alignment,
          };
        },
        parseHTML: element => element.getAttribute('data-alignment'),
      },
      float: {
        default: 'none',
        renderHTML: attributes => {
          if (!attributes.float || attributes.float === 'none') return {};
          return {
            'data-float': attributes.float,
          };
        },
        parseHTML: element => element.getAttribute('data-float'),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'img[src]',
        getAttrs: element => {
          const img = element as HTMLImageElement;
          return {
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt'),
            title: img.getAttribute('title'),
            width: img.getAttribute('width'),
            height: img.getAttribute('height'),
            alignment: img.getAttribute('data-alignment') || 'center',
            float: img.getAttribute('data-float') || 'none',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { alignment, float, ...attrs } = HTMLAttributes;
    
    // Start with base attributes
    const imgAttrs = mergeAttributes(this.options.HTMLAttributes, attrs);
    
    // Add the tiptap-image class for consistency
    const className = 'tiptap-image max-w-full h-auto rounded-lg';
    
    // Add alignment and float as data attributes
    if (alignment) {
      imgAttrs['data-alignment'] = alignment;
    }
    if (float && float !== 'none') {
      imgAttrs['data-float'] = float;
    }
    
    // Set the class
    imgAttrs.class = className;

    return ['img', imgAttrs];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});