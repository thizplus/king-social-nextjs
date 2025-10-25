"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Search, 
  Users, 
  //MessageCircle, 
  //Video, 
  //Zap, 
  //Star,
  Hash,
  //Play
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function VideoSidebar() {
  const {  isAuthenticated } = useAuth()
  const pathname = usePathname()
  
  // Check if current path is active
  const isActive = (path: string) => pathname === path
  
  // Mock recommended accounts
  const recommendedAccounts = [
    { id: '1', username: 'user1', displayName: 'User One', avatar: 'https://i.pravatar.cc/150?img=1', isVerified: true },
   // { id: '2', username: 'user2', displayName: 'User Two', avatar: 'https://i.pravatar.cc/150?img=2', isVerified: false },
   // { id: '3', username: 'user3', displayName: 'User Three', avatar: 'https://i.pravatar.cc/150?img=3', isVerified: true },
  //  { id: '4', username: 'user4', displayName: 'User Four', avatar: 'https://i.pravatar.cc/150?img=4', isVerified: false },
   // { id: '5', username: 'user5', displayName: 'User Five', avatar: 'https://i.pravatar.cc/150?img=5', isVerified: true },
  ]

  // Mock trending hashtags
  const trendingTags = [
    { id: '1', name: 'ต้นไม้', count: '45.2M' },
    { id: '2', name: 'ท่องเที่ยว', count: '32.8M' },
    { id: '3', name: 'อาหาร', count: '28.5M' },
    //{ id: '4', name: 'แมว', count: '22.1M' },
   // { id: '5', name: 'เพลง', count: '18.7M' },
  ]

  return (
    <aside className="hidden md:flex flex-col w-72 bg-black border-r border-white/10 overflow-y-auto">
      {/* Main Navigation */}
      <div className="px-2 py-4">

      

        <nav className="space-y-1">

        <Link href="/" className="flex items-center px-3 py-3">
              <div className="bg-primary w-10 h-10 rounded-md flex items-center justify-center mr-2 text-white">
                Z
              </div>
              <span className="text-xl font-bold">VOOBIZE</span>
            </Link>

          <NavItem 
            href="/" 
            icon={<Home size={22} />} 
            label="สำหรับคุณ" 
            active={isActive('/')} 
          />
          <NavItem 
            href="/following" 
            icon={<Users size={22} />} 
            label="กำลังติดตาม" 
            active={isActive('/following')} 
          />
          <NavItem 
            href="/explore" 
            icon={<Search size={22} />} 
            label="สำรวจ" 
            active={isActive('/explore')} 
          />
         
        </nav>
      </div>
      
      {/* Divider */}
      <div className="border-t border-white/10 my-2"></div>
      
      {/* Login Section (if not authenticated) */}
      {!isAuthenticated && (
        <div className="px-4 py-3">
          <p className="text-sm text-white/70 mb-3">เข้าสู่ระบบเพื่อติดตามผู้สร้างที่คุณชื่นชอบ</p>
          <Button className="w-full" size="sm">
            เข้าสู่ระบบ
          </Button>
        </div>
      )}
      
      {/* Recommended Accounts Section */}
      <div className="px-4 py-3">
        <h3 className="text-xs font-medium text-white/70 mb-3">แนะนำบัญชี</h3>
        <div className="space-y-3">
          {recommendedAccounts.map(account => (
            <Link href={`/profile/${account.username}`} key={account.id} className="flex items-center gap-3 hover:bg-white/5 rounded p-1">
              <Avatar className="h-9 w-9">
                <AvatarImage src={account.avatar} alt={account.displayName} />
                <AvatarFallback>{account.displayName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="text-sm font-medium truncate">{account.username}</p>
                  {account.isVerified && (
                    <span className="text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/50 truncate">{account.displayName}</p>
              </div>
            </Link>
          ))}
        </div>
        <Button variant="link" size="sm" className="text-xs text-primary mt-2 px-1">
          ดูทั้งหมด
        </Button>
      </div>
      
      {/* Trending Hashtags */}
      <div className="px-4 py-3">
        <h3 className="text-xs font-medium text-white/70 mb-3">แฮชแท็กยอดนิยม</h3>
        <div className="space-y-3">
          {trendingTags.map(tag => (
            <Link href={`/tag/${tag.name}`} key={tag.id} className="flex items-center gap-3 hover:bg-white/5 rounded p-1">
              <div className="bg-primary/10 rounded-full p-2">
                <Hash size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">#{tag.name}</p>
                <p className="text-xs text-white/50">{tag.count} วิดีโอ</p>
              </div>
            </Link>
          ))}
        </div>
        <Button variant="link" size="sm" className="text-xs text-primary mt-2 px-1">
          ดูทั้งหมด
        </Button>
      </div>
      
      {/* Footer Links */}
      <div className="px-4 py-6 mt-auto">
        <div className="text-xs text-white/50 space-y-4">
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/about" className="hover:underline">เกี่ยวกับ</Link>
            <Link href="/newsroom" className="hover:underline">ข่าวสาร</Link>
            <Link href="/contact" className="hover:underline">ติดต่อ</Link>
            <Link href="/careers" className="hover:underline">ร่วมงานกับเรา</Link>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            <Link href="/guidelines" className="hover:underline">แนวทางปฏิบัติ</Link>
            <Link href="/terms" className="hover:underline">เงื่อนไข</Link>
            <Link href="/privacy" className="hover:underline">ความเป็นส่วนตัว</Link>
          </div>
          <p>© 2025 VOOBIZE</p>
        </div>
      </div>
    </aside>
  )
}

// Navigation Item Component
interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function NavItem({ href, icon, label, active = false }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
        active 
          ? 'bg-white/10 text-white' 
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}