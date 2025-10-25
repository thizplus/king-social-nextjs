import { Video, Plus, Upload } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import React from 'react'

export default function PrimaryNav() {
    const pathname = usePathname()
    return (
        <nav className="flex items-center space-x-2">
            {/*}
    <NavItem href="/" icon={<Home size={20} />} active={pathname === '/'} />
    */}

            <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <Link href="/topic/create" className="flex items-center gap-2">
                    <Plus size={16} />
                    สร้างกระทู้
                </Link>
            </Button>

            <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <Link href="/video/upload" className="flex items-center gap-2">
                    <Upload size={16} />
                    อัพโหลด
                </Link>
            </Button>

            <NavItem href="/video" icon={<Video size={20} />} active={pathname === '/video'} />
        </nav>
    )
}

// Nav Item Component - สำหรับปุ่ม icon เท่านั้น
function NavItem({
    href,
    icon,
    active = false
}: {
    href: string;
    icon: React.ReactNode;
    active?: boolean
}) {
    return (
        <Link
            href={href}
            className={`flex items-center justify-center w-10 h-10 rounded-md transition-colors ${active
                    ? 'bg-primary text-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
        >
            {icon}
        </Link>
    )
}
