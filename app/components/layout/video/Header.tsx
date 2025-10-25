"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {  Menu,  CircleUser } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '@/hooks/useAuth'
import MobileSidebar from './MobileSidebar'

interface VideoHeaderProps {
  showHeader: boolean;
}

export default function VideoHeader({ showHeader }: VideoHeaderProps) {
  const { user, isAuthenticated } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Top Header - Fixed and with shadow when scrolled */}
      <header className={`fixed top-0 left-0 right-0 h-16 bg-black/60 backdrop-blur-md border-b border-white/10 z-30 transition-all duration-300 md:hidden ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } ${scrolled ? 'shadow-md' : ''}`}>
        <div className="container max-w-7xl mx-auto flex items-center justify-between h-full px-4">
          {/* Left Side with Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Trigger */}
            <MobileSidebar>
              <Button variant="ghost" size="icon" className="size-10 text-white hover:bg-white/10">
                <Menu className="size-[28px]" />
              </Button>
            </MobileSidebar>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="bg-primary w-10 h-10 rounded-md flex items-center justify-center text-foreground">
                <h1 className="font-bold text-xl">Z</h1>
              </div>
              <span className="ml-2.5 font-bold text-xl hidden sm:inline">VOOBIZE</span>
            </Link>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2">
          
           

            {/* Avatar - always visible */}
            <Link href="/profile">
              {isAuthenticated ? (
                <Avatar className="h-10 w-10 border border-white/20">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.fullName || user.username} />
                  ) : (
                    <AvatarFallback className="bg-primary text-foreground">
                      {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
              ) : (
                <Button variant="ghost" size="icon" className="size-10 text-white">
                  <CircleUser className="size-[30px]" />
                </Button>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main content padding to accommodate fixed header - only for mobile */}
     
    </>
  )
}