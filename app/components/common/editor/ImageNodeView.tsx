// src/components/globals/editor/ImageNodeView.tsx
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Settings,
  AlignLeft,
  AlignCenter,
  AlignRight,
  MoveLeft,
  MoveRight,
  Square,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';



const ImageNodeView: React.FC<NodeViewProps> = ({ 
  node, 
  updateAttributes, 
  selected, 
  deleteNode 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempAlt, setTempAlt] = useState(node.attrs.alt || '');
  const [tempTitle, setTempTitle] = useState(node.attrs.title || '');
  const imgRef = useRef<HTMLImageElement>(null);

  const { src, alt, title, width, height, alignment = 'center', float = 'none' } = node.attrs;

  // Update temp values when node attrs change
  useEffect(() => {
    setTempAlt(node.attrs.alt || '');
    setTempTitle(node.attrs.title || '');
  }, [node.attrs.alt, node.attrs.title]);

  const handleSaveAttributes = () => {
    updateAttributes({
      alt: tempAlt,
      title: tempTitle,
    });
    setIsEditing(false);
  };

  const handleAlignmentChange = (newAlignment: 'left' | 'center' | 'right') => {
    updateAttributes({ 
      alignment: newAlignment,
      float: 'none' // Reset float when changing alignment
    });
  };

  const handleFloatChange = (newFloat: 'left' | 'right' | 'none') => {
    updateAttributes({ 
      float: newFloat,
      alignment: newFloat === 'none' ? 'center' : newFloat // Set alignment to match float
    });
  };

  const handleSizeChange = (dimension: 'width' | 'height', value: string) => {
    // Allow empty value to reset to natural size
    const newValue = value === '' ? null : value;
    updateAttributes({ [dimension]: newValue });
  };

  // Get CSS classes for styling
  const getImageClasses = () => {
    const classes = ['prose-img', 'max-w-full', 'h-auto', 'transition-all', 'duration-200'];
    
    if (selected) {
      classes.push('ring-2', 'ring-primary', 'ring-offset-2');
    }

    // Alignment classes
    if (float === 'none') {
      switch (alignment) {
        case 'left':
          classes.push('ml-0', 'mr-auto');
          break;
        case 'right':
          classes.push('ml-auto', 'mr-0');
          break;
        case 'center':
        default:
          classes.push('mx-auto');
          break;
      }
    }

    return classes.join(' ');
  };

  // Get container classes for floating
  const getContainerClasses = () => {
    const classes = ['image-container', 'relative', 'group'];
    
    if (float === 'left') {
      classes.push('float-left', 'mr-4', 'mb-2');
    } else if (float === 'right') {
      classes.push('float-right', 'ml-4', 'mb-2');
    } else {
      classes.push('block');
      // Add text alignment for non-floating images
      switch (alignment) {
        case 'left':
          classes.push('text-left');
          break;
        case 'right':
          classes.push('text-right');
          break;
        case 'center':
        default:
          classes.push('text-center');
          break;
      }
    }

    return classes.join(' ');
  };

  const getImageStyle = () => {
    const style: React.CSSProperties = {};
    
    if (width) {
      style.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height) {
      style.height = typeof height === 'number' ? `${height}px` : height;
    }

    return style;
  };

  return (
    <NodeViewWrapper className={getContainerClasses()}>
      <div className="relative">
        <Image
          ref={imgRef}
          src={src}
          alt={alt || ''}
          title={title || ''}
          width={width || 800}
          height={height || 600}
          className={getImageClasses()}
          style={getImageStyle()}
          draggable={false}
        />
        
        {/* Floating action buttons - show on hover or when selected */}
        <div className={cn(
          "absolute top-2 right-2 flex gap-1 transition-opacity duration-200",
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          {/* Settings Button */}
          <Popover open={isEditing} onOpenChange={setIsEditing}>
            <PopoverTrigger asChild>
              <Button 
                variant="secondary" 
                size="sm" 
                className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" side="left">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">แก้ไขรูปภาพ</h4>
                  <p className="text-sm text-muted-foreground">
                    ปรับแต่งการแสดงผลและข้อมูลรูปภาพ
                  </p>
                </div>

                {/* Alt text */}
                <div className="space-y-2">
                  <Label htmlFor="alt-text">Alt Text</Label>
                  <Input
                    id="alt-text"
                    value={tempAlt}
                    onChange={(e) => setTempAlt(e.target.value)}
                    placeholder="คำอธิบายรูปภาพ..."
                  />
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title (Tooltip)</Label>
                  <Input
                    id="title"
                    value={tempTitle}
                    onChange={(e) => setTempTitle(e.target.value)}
                    placeholder="คำอธิบายเพิ่มเติม..."
                  />
                </div>

                {/* Size */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="width">Width (px)</Label>
                    <Input
                      id="width"
                      value={width || ''}
                      onChange={(e) => handleSizeChange('width', e.target.value)}
                      placeholder="Auto"
                      type="number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (px)</Label>
                    <Input
                      id="height"
                      value={height || ''}
                      onChange={(e) => handleSizeChange('height', e.target.value)}
                      placeholder="Auto"
                      type="number"
                    />
                  </div>
                </div>

                {/* Alignment */}
                <div className="space-y-2">
                  <Label>จัดตำแหน่ง</Label>
                  <div className="flex gap-1">
                    <Button
                      variant={alignment === 'left' && float === 'none' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAlignmentChange('left')}
                    >
                      <AlignLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={alignment === 'center' && float === 'none' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAlignmentChange('center')}
                    >
                      <AlignCenter className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={alignment === 'right' && float === 'none' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleAlignmentChange('right')}
                    >
                      <AlignRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Float */}
                <div className="space-y-2">
                  <Label>ตำแหน่งลอย (Text Wrap)</Label>
                  <div className="flex gap-1">
                    <Button
                      variant={float === 'left' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFloatChange('left')}
                    >
                      <MoveLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={float === 'none' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFloatChange('none')}
                    >
                      <Square className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={float === 'right' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFloatChange('right')}
                    >
                      <MoveRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ลอยซ้าย/ขวา: ข้อความจะไหลรอบรูปภาพ
                  </p>
                </div>

                {/* Action buttons */}
                <div className="flex justify-between">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                      deleteNode();
                      setIsEditing(false);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    ลบ
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSaveAttributes}
                  >
                    บันทึก
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </NodeViewWrapper>
  );
};

export default ImageNodeView;