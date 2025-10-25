// src/config/site.ts

export const siteConfig = {
    name: "VOOBIZE",
    description: "Connect with friends, share moments, and discover content on VOOBIZE social network.",
    url: process.env.NODE_ENV === 'production' ? "https://VOOBIZE.com" : "http://localhost:3000", // ใช้ localhost สำหรับ development
    ogImage: "https://VOOBIZE.com/og-image.jpg", // รูปที่จะแสดงเมื่อแชร์บน social media
    author: "VOOBIZE Team",
    storageKey: "VOOBIZE-theme",
    keywords: [
      "social network",
      "social media",
      "online community",
      "photo sharing",
      "content sharing",
      "connection platform",
      "VOOBIZE",
    ],
    links: {
      twitter: "https://twitter.com/VOOBIZE",
      github: "https://github.com/VOOBIZE",
      facebook: "https://facebook.com/VOOBIZE",
      instagram: "https://instagram.com/VOOBIZE",
    },
    mainNav: [
      {
        title: "หน้าหลัก",
        href: "/",
      },
      {
        title: "ค้นพบ",
        href: "/explore",
      },
      {
        title: "เกี่ยวกับเรา",
        href: "/about",
      },
      {
        title: "ช่วยเหลือ",
        href: "/help",
      },
    ],
    footerLinks: [
      {
        title: "เกี่ยวกับ",
        items: [
          { title: "เกี่ยวกับเรา", href: "/about" },
          { title: "บล็อก", href: "/blog" },
          { title: "ติดต่อ", href: "/contact" },
        ],
      },
      {
        title: "นโยบาย",
        items: [
          { title: "เงื่อนไขการใช้งาน", href: "/terms" },
          { title: "นโยบายความเป็นส่วนตัว", href: "/privacy" },
          { title: "คุกกี้", href: "/cookies" },
        ],
      },
      {
        title: "ช่วยเหลือ",
        items: [
          { title: "คำถามที่พบบ่อย", href: "/faq" },
          { title: "ศูนย์ช่วยเหลือ", href: "/help" },
          { title: "รายงานปัญหา", href: "/report" },
        ],
      },
    ],
  }