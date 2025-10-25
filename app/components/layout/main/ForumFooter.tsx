// components/layout/ForumFooter.tsx
"use client"

import Link from 'next/link';
import { useState } from 'react';
import { 
  ChevronRight, 
  Home,
  Users,
  //MessageCircle,
  Bell,
  Heart,
  BookOpen,
 // Coffee,
  ShoppingBag,
  Landmark,
  Camera,
  MapPin,
  PenTool,
  Briefcase,
  Hash,
  Award,
  Headphones,
  Phone,
  HelpCircle,
  Info,
  Shield,
  FileText,
  Mail,
  Facebook,
  Twitter,
  Youtube,
  Instagram,
  Smartphone
} from 'lucide-react';

interface FooterLinkGroup {
  title: string;
  links: {
    name: string;
    href: string;
    icon?: React.ReactNode;
  }[];
}

interface FooterProps {
  className?: string;
}

const ForumFooter = ({ className }: FooterProps) => {
  // สถานะสำหรับการแสดงเมนูบนอุปกรณ์มือถือ
  const [activeGroups, setActiveGroups] = useState<{[key: string]: boolean}>({});

  // ฟังก์ชันสำหรับเปิด/ปิดกลุ่มเมนูบนอุปกรณ์มือถือ
  const toggleGroup = (title: string) => {
    setActiveGroups(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  // ข้อมูลหมวดหมู่กระทู้ยอดนิยม
  const footerData: FooterLinkGroup[] = [
    {
      title: "หมวดหมู่ยอดนิยม",
      links: [
        { name: "สยามสแควร์", href: "/forum/siam", icon: <ShoppingBag size={16} /> },
        { name: "ชานเรือน", href: "/forum/home", icon: <Home size={16} /> },
        { name: "โต๊ะเครื่องแป้ง", href: "/forum/beauty", icon: <Heart size={16} /> },
        { name: "กล้อง", href: "/forum/camera", icon: <Camera size={16} /> },
        { name: "มาบุญครอง", href: "/forum/it", icon: <Smartphone size={16} /> },
        { name: "การ์ตูน", href: "/forum/cartoon", icon: <PenTool size={16} /> },
        { name: "ท่องเที่ยว", href: "/forum/travel", icon: <MapPin size={16} /> },
        { name: "บลูแพลนเน็ต", href: "/forum/blueplanet", icon: <Landmark size={16} /> }
      ]
    },
    {
      title: "แท็กยอดนิยม",
      links: [
        { name: "#วงการบันเทิง", href: "/tag/entertainment", icon: <Hash size={16} /> },
        { name: "#วอลเลย์บอล", href: "/tag/volleyball", icon: <Hash size={16} /> },
        { name: "#BNK48", href: "/tag/bnk48", icon: <Hash size={16} /> },
        { name: "#หมอลำไทย", href: "/tag/morlum", icon: <Hash size={16} /> },
        { name: "#BLACKPINK", href: "/tag/blackpink", icon: <Hash size={16} /> },
        { name: "#วันพีซ", href: "/tag/onepiece", icon: <Hash size={16} /> },
        { name: "#การเมือง", href: "/tag/politics", icon: <Hash size={16} /> },
        { name: "#รีวิวร้านอาหาร", href: "/tag/foodreview", icon: <Hash size={16} /> }
      ]
    },
    {
      title: "ช่วยเหลือ",
      links: [
        { name: "วิธีใช้งานเว็บไซต์", href: "/help/how-to-use", icon: <HelpCircle size={16} /> },
        { name: "กฎและมารยาท", href: "/help/rules", icon: <FileText size={16} /> },
        { name: "นโยบายความเป็นส่วนตัว", href: "/help/privacy", icon: <Shield size={16} /> },
        { name: "คำถามที่พบบ่อย", href: "/help/faq", icon: <Info size={16} /> },
        { name: "แจ้งปัญหาการใช้งาน", href: "/help/report", icon: <Bell size={16} /> },
        { name: "ติดต่อทีมงาน", href: "/help/contact", icon: <Mail size={16} /> }
      ]
    },
    {
      title: "เกี่ยวกับเรา",
      links: [
        { name: "เกี่ยวกับเว็บไซต์", href: "/about", icon: <Info size={16} /> },
        { name: "ทีมงาน", href: "/about/team", icon: <Users size={16} /> },
        { name: "ร่วมงานกับเรา", href: "/about/career", icon: <Briefcase size={16} /> },
        { name: "โฆษณากับเรา", href: "/about/advertise", icon: <Award size={16} /> },
        { name: "บล็อกทีมงาน", href: "/about/blog", icon: <BookOpen size={16} /> },
        { name: "ติดต่อเรา", href: "/about/contact", icon: <Phone size={16} /> }
      ]
    }
  ];

  // สื่อสังคมออนไลน์
  const socialLinks = [
    { name: "Facebook", href: "https://facebook.com/yourforum", icon: <Facebook size={20} /> },
    { name: "Twitter", href: "https://twitter.com/yourforum", icon: <Twitter size={20} /> },
    { name: "Youtube", href: "https://youtube.com/yourforum", icon: <Youtube size={20} /> },
    { name: "Instagram", href: "https://instagram.com/yourforum", icon: <Instagram size={20} /> }
  ];

  return (
    <footer className={`w-full ${className}`}>
      <div className="container mx-auto px-4 py-8">
        {/* หมวดหมู่ลิงก์ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerData.map((group) => (
            <div key={group.title} className="space-y-4">
              <div 
                className="flex items-center justify-between cursor-pointer md:cursor-default"
                onClick={() => toggleGroup(group.title)}
              >
                <h3 className="font-semibold text-lg flex items-center">
                  {group.title}
                  {group.title === "หมวดหมู่ยอดนิยม" && <ChevronRight className="ml-1 h-4 w-4" />}
                </h3>
                <ChevronRight 
                  className={`h-5 w-5 transition-transform md:hidden ${activeGroups[group.title] ? 'rotate-90' : ''}`} 
                />
              </div>
              
              <ul className={`space-y-2 ${!activeGroups[group.title] ? 'hidden md:block' : ''}`}>
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="text-sm hover:underline flex items-center"
                    >
                      {link.icon && <span className="mr-2">{link.icon}</span>}
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ส่วนด้านล่าง */}
        <div className="mt-12 border-t pt-8">
          {/* Social Media Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {socialLinks.map((social, index) => (
              <Link 
                key={index} 
                href={social.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </Link>
            ))}
          </div>

          {/* App Download Links */}
          <div className="flex justify-center items-center flex-wrap gap-4 mb-8">
            <div className="flex items-center border rounded-md px-4 py-2">
              <Smartphone className="mr-2 h-5 w-5" />
              <div className="text-sm">
                <div className="text-xs">ดาวน์โหลด</div>
                <div className="font-semibold">แอพพลิเคชั่นบนมือถือ</div>
              </div>
            </div>
            <Link href="/app" className="text-sm hover:underline flex items-center">
              <Headphones className="mr-1 h-4 w-4" />
              แจ้งบัคและข้อเสนอแนะ
            </Link>
          </div>

          {/* Contact */}
          <div className="text-center mb-8">
            <div className="text-sm text-muted-foreground mb-1">ติดต่อทีมงาน</div>
            <div className="font-semibold">contact@yourforumsite.com</div>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Your Forum Site สงวนลิขสิทธิ์ตามกฎหมาย</p>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              <Link href="/privacy" className="hover:underline">นโยบายความเป็นส่วนตัว</Link>
              <Link href="/terms" className="hover:underline">ข้อกำหนดและเงื่อนไข</Link>
              <Link href="/cookies" className="hover:underline">นโยบายคุกกี้</Link>
              <Link href="/sitemap" className="hover:underline">แผนผังเว็บไซต์</Link>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="flex justify-center mt-6">
            <div className="border rounded-md px-4 py-2 text-xs text-center flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              <span>เว็บไซต์นี้ปลอดภัยด้วย SSL และเข้ารหัสข้อมูลทั้งหมด</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ForumFooter;