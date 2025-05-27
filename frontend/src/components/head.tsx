"use client"

import { Search } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import ProfileMenu from "./profile-menu"

export default function Header() {
  return (
    <header className="border-b px-4 py-2 flex items-center justify-between bg-white sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1">
          <Image src="/image.png" alt="ABHUDAYA Logo" width={20} height={20} className="w-5" />
          <span className="font-semibold text-sm">ABHUDAYA</span>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="search"
            placeholder="Search for 'MyPage Services'"
            className="pl-9 pr-4 py-1.5 border rounded-md w-[280px] text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
          <Image src="image.png" alt="Hi, Chatbot" width={20} height={20} />
        </Button>
        <Button variant="ghost" size="sm" className="rounded-full w-8 h-8 p-0">
          <Image src="/image.png" alt="Dark mode" width={20} height={20} />
        </Button>
        <ProfileMenu />
      </div>
    </header>
  )
}

