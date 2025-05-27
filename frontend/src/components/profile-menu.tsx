"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet"
import { History, Languages, Settings, HelpCircle, Info, LogOut, UserPlus, FileText, BookOpen } from "lucide-react"

export default function ProfileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <span className="text-sm">My Profile</span>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="flex items-center gap-4 p-4 border-b">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-pink-50 text-pink-700 text-xs px-2 py-0.5 rounded-full border border-pink-200">
                1 / 10
              </div>
            </div>
            <div>
              <div className="font-medium">Hey,</div>
              <div className="text-sm text-gray-600">9773706044</div>
              <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">Admin</span>
            </div>
          </div>
        </SheetHeader>
        <div className="py-4">
          <nav className="space-y-1">
            <Link
              href="/dashboard/profile/setup"
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50"
            >
              <UserPlus className="w-5 h-5 text-blue-600" />
              Add Profile
            </Link>
            <Link href="/dashboard/transactions" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50">
              <History className="w-5 h-5 text-blue-600" />
              Transaction History
            </Link>
            <Link href="/dashboard/track" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50">
              <FileText className="w-5 h-5 text-blue-600" />
              Track Status
            </Link>
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50">
              <Settings className="w-5 h-5 text-blue-600" />
              Settings
            </Link>
            <div className="flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <Languages className="w-5 h-5 text-blue-600" />
                Language
              </div>
              <span className="text-gray-600">English</span>
            </div>
            <Link href="/dashboard/directory" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Service Directory
            </Link>
            <button className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 w-full">
              <HelpCircle className="w-5 h-5 text-blue-600" />
              Help & Support
            </button>
            <Link href="/dashboard/about" className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50">
              <Info className="w-5 h-5 text-blue-600" />
              About Us
            </Link>
            <button className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 w-full text-red-600">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}

