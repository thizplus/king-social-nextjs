// hooks/useResponsive.ts
'use client'

import { useState, useEffect } from 'react'

// กำหนด breakpoints ตาม Tailwind CSS
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

type Breakpoint = keyof typeof breakpoints
type BreakpointState = Record<Breakpoint, boolean> & {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  width: number
  height: number
}

/**
 * Hook สำหรับจัดการ responsive layout
 * ส่งคืนข้อมูลว่าหน้าจอตรงกับ breakpoint ไหนบ้าง และข้อมูลขนาดหน้าจอ
 */
export default function useResponsive(): BreakpointState {
  // เริ่มต้นด้วยค่า default ที่เหมาะสำหรับ SSR
  const [state, setState] = useState<BreakpointState>({
    sm: false,
    md: false,
    lg: false,
    xl: false,
    '2xl': false,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0,
    height: 0,
  })

  useEffect(() => {
    // ฟังก์ชันนี้จะทำงานเมื่อขนาดหน้าจอเปลี่ยนแปลง
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setState({
        sm: width >= breakpoints.sm,
        md: width >= breakpoints.md,
        lg: width >= breakpoints.lg,
        xl: width >= breakpoints.xl,
        '2xl': width >= breakpoints['2xl'],
        isMobile: width < breakpoints.md,
        isTablet: width >= breakpoints.md && width < breakpoints.lg,
        isDesktop: width >= breakpoints.lg,
        width,
        height,
      })
    }

    // ทำงานทันทีหลังจาก mount
    handleResize()

    // เพิ่ม event listener
    window.addEventListener('resize', handleResize)

    // ทำความสะอาด event listener เมื่อ unmount
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return state
}

/**
 * Hook สำหรับตรวจสอบ media query โดยเฉพาะ
 * @param query Media query string (เช่น '(min-width: 768px)')
 * @returns Boolean ที่บอกว่า query ตรงกับหน้าจอปัจจุบันหรือไม่
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  
  useEffect(() => {
    // เลี่ยงการทำงานบน server
    if (typeof window === 'undefined') return
    
    const media = window.matchMedia(query)
    
    // ตั้งค่าเริ่มต้น
    setMatches(media.matches)
    
    // ฟังก์ชันที่จะทำงานเมื่อ media query เปลี่ยนสถานะ
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)
    
    // เพิ่ม event listener
    media.addEventListener('change', listener)
    
    // ทำความสะอาด event listener เมื่อ unmount
    return () => media.removeEventListener('change', listener)
  }, [query])
  
  return matches
}

/**
 * Hook สำหรับเช็คว่าหน้าจอตรงกับ breakpoint หรือไม่
 * @param breakpoint Breakpoint ที่ต้องการตรวจสอบ ('sm', 'md', 'lg', 'xl', '2xl')
 * @param direction 'up' เช็คว่าใหญ่กว่าหรือเท่ากับ breakpoint, 'down' เช็คว่าเล็กกว่า breakpoint
 * @returns Boolean ที่บอกว่าขนาดหน้าจอตรงกับเงื่อนไขหรือไม่
 */
export function useBreakpoint(breakpoint: Breakpoint, direction: 'up' | 'down' = 'up'): boolean {
  const value = breakpoints[breakpoint]
  const query = direction === 'up' 
    ? `(min-width: ${value}px)` 
    : `(max-width: ${value - 0.1}px)`
  
  return useMediaQuery(query)
}