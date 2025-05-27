import type React from "react"
import Header from "@/components/head"
import Sidebar from "@/components/side"

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-[#F8F9FA]">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main>{children}</main>
      </div>
    </div>
  )
}

