import type React from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

export default function UserHomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-[#F8F9FA]">
      <Sidebar />
      <div className="flex-1 pl-64"> {/* Added pl-64 to offset content from sidebar */}
        <div className="sticky top-0 z-50"> {/* Added wrapper for header with sticky positioning */}
          <Header />
        </div>
        <main className="p-6"> {/* Added padding for better content spacing */}
          {children}
        </main>
      </div>
    </div>
  )
}