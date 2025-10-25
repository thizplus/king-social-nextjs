// components/layout/MobileHeader.tsx
"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Bell,
  MessageSquare,
  //User,
  Menu,
  //ShieldUser,
  CircleUser
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import MobileSidebar from './MobileSidebar'
import PrimaryNav from './PrimaryNav'
import ClientOnly from '@/components/common/ClientOnly'

interface MobileHeaderProps {
  onMenuClick?: () => void
}

const MobileHeader = ({  }: MobileHeaderProps) => {
  const { user, isAuthenticated } = useAuth()
  const [scrolled, setScrolled] = useState(false)
  // const [isMounted, setIsMounted] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle mounting (not needed anymore with ClientOnly)
  // useEffect(() => {
  //   setIsMounted(true)
  // }, [])

  return (
    <>
      {/* Top Header - Fixed and with shadow when scrolled */}
      <header className={`fixed top-0 left-0 right-0 h-16 bg-background border-b z-30 transition-all duration-200 ${scrolled ? 'shadow-md' : ''
        }`}>
        <div className="container max-w-7xl mx-auto flex items-center justify-between h-full px-4">
          {/* Left Side with Logo */}
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Trigger */}
            <MobileSidebar>


              <Button variant="ghost" size="icon" className="size-10">
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

            {/* Primary Navigation */}
            <PrimaryNav />

          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/notifications" className="relative hidden sm:block">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
                <Bell size={22} />
                {/* Notification indicator */}
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
              </Button>
            </Link>

            <Link href="/messages" className="relative hidden sm:block">
              <Button variant="ghost" size="icon" className="text-foreground hover:bg-secondary">
                <MessageSquare size={22} />
                {/* Message count */}
                <span className="absolute -top-1 -right-1 text-[10px] px-1.5 py-0.5 rounded-full bg-primary text-foreground">
                  5
                </span>
              </Button>
            </Link>

            {/* Avatar - always visible */}
            <Link href="/profile">
              <ClientOnly
                fallback={
                  <div className="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
                }
              >
                {isAuthenticated && user ? (
                  <Avatar className="h-10 w-10 border border-primary">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.fullName || user.username} />
                    ) : (
                      <AvatarFallback className="bg-primary text-foreground">
                        {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                ) : (
                  <Button variant="ghost" size="icon" className="size-10">
                    <CircleUser className="size-[30px]" />
                  </Button>
                )}
              </ClientOnly>
            </Link>
          </div>
        </div>
      </header>

      {/* Main content padding to accommodate fixed header */}
      <div className="pt-16"></div>
    </>
  )
}

export default MobileHeader