// components/theme/mode-toggle.tsx
"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // ตรวจสอบว่า component ถูก mount แล้วเพื่อป้องกัน hydration error
  useEffect(() => {
    setMounted(true)
  }, [])

  // สลับระหว่าง light และ dark mode
  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark")
    }
  }

  // ถ้ายังไม่ mount ให้แสดง placeholder เพื่อป้องกัน layout shift
  if (!mounted) {
    return (
      <Button 
        variant="ghost"
        size="icon"
        className="w-10 h-10 rounded-md opacity-0"
        aria-label="เปลี่ยนธีม"
      />
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="w-10 h-10 rounded-md"
      aria-label="เปลี่ยนธีม"
    >
      {theme === "dark" ? (
        <Moon className="size-[20px]" />
      ) : (
        <Sun className="size-[20px]" />
      )}
    </Button>
  )
}