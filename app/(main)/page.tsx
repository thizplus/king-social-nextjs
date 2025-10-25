// app/(main)/page.tsx
"use client"

import CategoryScroll from "@/components/pages/home/CategoryScroll";
import GroupTopicCard from "@/components/pages/home/GroupTopicCard";
import GroupThreadCard from "@/components/pages/home/GroupThreadCard";
import { PromotionCard } from "@/components/pages/home/PromotionCard";
import { TrendingTags } from "@/components/pages/home/TrendingTags";
import { TopicList } from "@/components/pages/home/TopicList";



export default function Page() {



  return (
    <div className="container max-w-6xl mx-auto h-full px-4 pb-8 ">
      <CategoryScroll />


      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column - 1/4 width on desktop, full width on mobile */}
    

        {/* Middle Column - 1/2 width on desktop, full width on mobile */}
        <div className="md:col-span-8 space-y-4">
        <GroupThreadCard title="กระทู้ล่าสุด"  />
        <GroupTopicCard title="กระทู้แนะนำ"  />
      
        </div>

        {/* Right Column - 1/4 width on desktop, full width on mobile */}
        <div className="md:col-span-4 space-y-4">
        <PromotionCard title="สมัครสมาชิก" description="สมัครสมาชิกเพื่อรับสิทธิประโยชน์ที่ดีที่สุด" imageUrl="/img.png" href="/" ctaText="ดูรายละเอียด" />
        <TrendingTags />
        <TopicList title="กำลังฮิต" />
        </div>
      </div>
    



    </div>
  );
}
