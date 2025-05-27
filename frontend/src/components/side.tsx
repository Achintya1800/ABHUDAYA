"use client"

import { Home, FileText, Users, Settings, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[240px] border-r bg-white h-screen sticky top-0">
      <div className="py-4">
        <div className="px-4 mb-4">
          <span className="text-sm font-medium">myUMANG</span>
        </div>
        <nav className="space-y-0.5">
          <Link
            href="/portal"
            className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
              pathname === "/portal" ? "text-white bg-[#0F5EDD]" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Home className="w-4 h-4" />
            Services
          </Link>
          <Link
            href="/portal/documents"
            className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
              pathname.includes("/documents") ? "text-white bg-[#0F5EDD]" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-4 h-4" />
            Documents
          </Link>
          <Link
            href="/portal/marketplace"
            className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
              pathname.includes("/marketplace") ? "text-white bg-[#0F5EDD]" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Users className="w-4 h-4" />
            Marketplace
          </Link>
          <Link
            href="/portal/schemes"
            className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
              pathname.includes("/schemes") ? "text-white bg-[#0F5EDD]" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings className="w-4 h-4" />
            Schemes
          </Link>
          <Link
            href="/portal"
            className={`flex items-center gap-3 px-4 py-2.5 text-sm ${
              pathname === "/portal" ? "text-white bg-[#0F5EDD]" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </nav>
      </div>
    </aside>
  )
}

