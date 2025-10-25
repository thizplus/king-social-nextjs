// app/(auth)/layout.tsx
import { MessageSquare } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* ด้านซ้าย - ฟอร์ม */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-background text-foreground">
        <div className="w-full max-w-xs">
          {children}
        </div>
      </div>

      {/* ด้านขวา - แบรนดิ้ง */}
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-ring to-destructive">
          <div className="absolute inset-0 bg-black opacity-10" />
          
          {/* ลายพื้นหลัง */}
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-foreground text-center max-w-md px-8">
              <div className="flex justify-center mb-8">
                <div className="bg-primary-foreground/20 backdrop-blur-sm p-4 rounded-2xl">
                  <MessageSquare className="h-16 w-16 text-foreground" />
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-4">VOOBIZE</h1>
              <p className="text-xl opacity-90">
                เชื่อมต่อกับเพื่อน ครอบครัว และธุรกิจในแพลตฟอร์มเดียวที่ราบรื่น
              </p>
              
              {/* สถิติ */}
              <div className="grid grid-cols-3 gap-4 mt-12">
                <div>
                  <div className="text-3xl font-bold">10K+</div>
                  <div className="text-sm opacity-75">ผู้ใช้ที่ใช้งานอยู่</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50K+</div>
                  <div className="text-sm opacity-75">ข้อความต่อวัน</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">99.9%</div>
                  <div className="text-sm opacity-75">เวลาให้บริการ</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* องค์ประกอบตกแต่ง */}
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary-foreground opacity-10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-foreground opacity-10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
      </div>
    </div>
  )
}