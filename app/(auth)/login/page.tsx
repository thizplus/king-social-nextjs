// app/(auth)/login/page.tsx
'use client'

import Link from 'next/link'
import { MessageSquare } from 'lucide-react'
import { LoginForm } from '@/components/auth/LoginForm'

export default function Page() {
  return (
    <div className="space-y-6 py-8">
      <div className="flex flex-col space-y-2 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <MessageSquare className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">VOOBIZE</h1>
        <p className="text-sm text-muted-foreground">
          กรุณากรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าสู่ระบบบัญชีของคุณ
        </p>
      </div>

      <LoginForm />

      <div className="mt-4 text-center text-sm">
        ยังไม่มีบัญชี?{' '}
        <Link href="/register" className="font-medium text-primary hover:underline">
          ลงทะเบียน
        </Link>
      </div>
    </div>
  )
}