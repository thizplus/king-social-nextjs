// components/sidebar/PromotionCard.tsx
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PromotionCardProps {
  title: string;
  description?: string;
  imageUrl: string;
  href: string;
  ctaText?: string;
  badges?: string[];
  footer?: string;
  imageHeight?: number;
  className?: string;
  imagePriority?: boolean;
  bordered?: boolean;
  bgColor?: string;
}

export function PromotionCard({ 
  title, 
  description,
  imageUrl,
  href,
  ctaText = "ดูรายละเอียด",
  badges,
  footer,
  imageHeight = 250,
  className,
  imagePriority = false,
  bordered = true,
  bgColor = "bg-card"
}: PromotionCardProps) {
  return (
    <div className={cn(
      "rounded-lg overflow-hidden", 
      bordered && "border border-border",
      bgColor,
      className
    )}>
      {/* รูปภาพ */}
      <div className="relative w-full" style={{ height: `${imageHeight}px` }}>
        <Image 
          src={imageUrl}
          alt={title}
          fill
          priority={imagePriority}
          className="object-cover"
        />
      </div>
      
      {/* เนื้อหา */}
      <div className="p-4">
        {badges && badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {badges.map((badge, index) => (
              <span 
                key={index}
                className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
        
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}
        
        <Link 
          href={href}
          className="inline-block px-4 py-2 bg-primary text-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {ctaText}
        </Link>
      </div>
      
      {/* Footer */}
      {footer && (
        <div className="p-3 border-t border-border text-sm text-center text-muted-foreground">
          {footer}
        </div>
      )}
    </div>
  );
}

// คอมโพเนนต์สำหรับแสดงการสมัครสมาชิก
export function SignupPromoCard({
  platforms = ['Facebook', 'Line', 'Apple', 'Google', 'Email'],
  className
}: {
  platforms?: string[];
  className?: string;
}) {
  return (
    <PromotionCard
      title="สมัครสมาชิก"
      description={`สมัครสมาชิกง่ายนิดเดียวผ่าน ${platforms.length} ช่องทาง`}
      imageUrl="/images/signup-promo.png"
      href="/signup"
      ctaText="สมัครสมาชิก"
      badges={["ฟรี", "ง่าย"]}
      footer="สมัครสมาชิกง่ายนิดเดียว ❤️"
      bgColor="bg-[#1a1a42]"
      className={className}
    />
  );
}