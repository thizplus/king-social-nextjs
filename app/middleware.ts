// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/login' || path === '/register' || path === '/forgot-password'

  // ดึง token จาก cookie
  const token = request.cookies.get('token')?.value || ''

  // ถ้าเข้าสู่ระบบแล้ว และพยายามเข้าถึง public paths
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // ถ้ายังไม่เข้าสู่ระบบ และพยายามเข้าถึง protected paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // ผ่านการตรวจสอบ ให้ดำเนินการต่อ
  return NextResponse.next()
}

// กำหนดเส้นทางที่ต้องการใช้ middleware
export const config = {
  matcher: ['/', '/profile/:path*', '/login', '/register', '/forgot-password', '/admin/:path*']
}