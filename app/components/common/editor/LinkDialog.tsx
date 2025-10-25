// src/components/editor/LinkDialog.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { LinkData, LinkDialogProps } from '@/types/editor';

export const LinkDialog: React.FC<LinkDialogProps> = ({ 
  open, 
  onOpenChange, 
  onSave, 
  initialData 
}) => {
  const [linkData, setLinkData] = useState<LinkData>({
    href: '',
    text: '',
    target: '_self',
    rel: []
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (initialData) {
      setLinkData({
        href: initialData.href || '',
        text: initialData.text || '',
        target: initialData.target || '_self',
        rel: initialData.rel || []
      });
    } else {
      setLinkData({
        href: '',
        text: '',
        target: '_self',
        rel: []
      });
    }
  }, [initialData, open]);

  const handleSave = () => {
    if (linkData.href.trim()) {
      onSave(linkData);
      onOpenChange(false);
    }
  };

  const handleRelChange = (relValue: string, checked: boolean) => {
    setLinkData(prev => ({
      ...prev,
      rel: checked
        ? [...prev.rel, relValue]
        : prev.rel.filter(r => r !== relValue)
    }));
  };

  // ตรวจสอบ external link อย่างปลอดภัย
  const isExternalLink = isMounted &&
    linkData.href &&
    (linkData.href.startsWith('http://') || linkData.href.startsWith('https://')) &&
    typeof window !== 'undefined' &&
    !linkData.href.includes(window.location.hostname);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>เพิ่ม/แก้ไขลิงก์</DialogTitle>
          <DialogDescription>
            กรอกข้อมูลลิงก์และตั้งค่าตัวเลือกต่างๆ
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              placeholder="https://example.com"
              value={linkData.href}
              onChange={(e) => setLinkData(prev => ({ ...prev, href: e.target.value }))}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="text">ข้อความที่แสดง</Label>
            <Input
              id="text"
              placeholder="คลิกที่นี่"
              value={linkData.text}
              onChange={(e) => setLinkData(prev => ({ ...prev, text: e.target.value }))}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="new-tab"
              checked={linkData.target === '_blank'}
              onCheckedChange={(checked) => setLinkData(prev => ({
                ...prev,
                target: checked ? '_blank' : '_self'
              }))}
            />
            <Label htmlFor="new-tab">เปิดในแท็บใหม่</Label>
          </div>

          {isExternalLink && (
            <div className="text-sm text-muted-foreground">
              🔗 ลิงก์ภายนอก - แนะนำให้ใช้ rel attributes เพื่อความปลอดภัย
            </div>
          )}

          <div className="space-y-3">
            <Label>SEO & Security Options</Label>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="nofollow"
                checked={linkData.rel.includes('nofollow')}
                onCheckedChange={(checked) => handleRelChange('nofollow', !!checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="nofollow" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  nofollow
                </Label>
                <p className="text-xs text-muted-foreground">
                  บอก search engine ไม่ให้ติดตามลิงก์นี้
                </p>
              </div>
            </div>

            {linkData.target === '_blank' && (
              <>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noopener"
                    checked={linkData.rel.includes('noopener')}
                    onCheckedChange={(checked) => handleRelChange('noopener', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="noopener" className="text-sm font-medium leading-none">
                      noopener
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      ป้องกันหน้าใหม่เข้าถึง window.opener
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="noreferrer"
                    checked={linkData.rel.includes('noreferrer')}
                    onCheckedChange={(checked) => handleRelChange('noreferrer', !!checked)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label htmlFor="noreferrer" className="text-sm font-medium leading-none">
                      noreferrer
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      ไม่ส่งข้อมูล referrer ไปยังหน้าปลายทาง
                    </p>
                  </div>
                </div>
              </>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="sponsored"
                checked={linkData.rel.includes('sponsored')}
                onCheckedChange={(checked) => handleRelChange('sponsored', !!checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="sponsored" className="text-sm font-medium leading-none">
                  sponsored
                </Label>
                <p className="text-xs text-muted-foreground">
                  ลิงก์ที่เป็นโฆษณาหรือได้รับการสนับสนุน
                </p>
              </div>
            </div>
          </div>

          {/* แสดงตัวอย่าง HTML ที่จะได้ */}
          <div className="rounded-lg bg-muted p-3">
            <Label className="text-xs text-muted-foreground">HTML ที่จะได้:</Label>
            <pre className="mt-1 text-xs font-mono text-foreground">
              {`<a href="${linkData.href}"${linkData.target === '_blank' ? ' target="_blank"' : ''}${linkData.rel.length > 0 ? ` rel="${linkData.rel.join(' ')}"` : ''}>${linkData.text || 'ข้อความลิงก์'}</a>`}
            </pre>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            ยกเลิก
          </Button>
          <Button type="button" onClick={handleSave} disabled={!linkData.href.trim()}>
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};