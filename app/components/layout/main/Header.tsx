// components/layout/Header.tsx
"use client"

import DesktopHeader from './DesktopHeader'
import MobileHeader from './MobileHeader'

interface HeaderProps {
  onMenuClick?: () => void
}

const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <>
      {/* Desktop Header - ซ่อนบนมือถือด้วย CSS */}
      <div className="hidden md:block">
        <DesktopHeader onMenuClick={onMenuClick} />
      </div>
      
      {/* Mobile Header - ซ่อนบนหน้าจอขนาดกลางขึ้นไปด้วย CSS */}
      <div className="block md:hidden">
        <MobileHeader onMenuClick={onMenuClick} />
      </div>
    </>
  )
}

export default Header