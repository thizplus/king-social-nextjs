// app/(main)/topic/[id]/not-found.tsx
import Link from 'next/link';
import { FileX, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function TopicNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-8">
            <FileX size={64} className="mx-auto text-muted-foreground/50 mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">
              ไม่พบกระทู้
            </h1>
            <p className="text-muted-foreground">
              กระทู้ที่คุณต้องการดูอาจถูกลบแล้วหรือไม่มีอยู่จริง
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild variant="default">
                <Link href="/forum">
                  <Home size={16} className="mr-2" />
                  ไปที่ฟอรัม
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeft size={16} className="mr-2" />
                  กลับหน้าแรก
                </Link>
              </Button>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                หากคุณคิดว่านี่เป็นข้อผิดพลาด กรุณา{' '}
                <Link href="/contact" className="text-primary hover:underline">
                  ติดต่อเรา
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}