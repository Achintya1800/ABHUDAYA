"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search, LockKeyhole } from "lucide-react"
import HeroSection from "@/components/hero-section"
import DocumentsSection from "@/components/documents-section"
import SignInModal from "@/components/sign-in-modal"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import ChatbotWidget from "@/components/chatbotWidget"

export default function HomePage() {
  const [showSignIn, setShowSignIn] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="w-64 flex-shrink-0" />
        <div className="flex-1 flex flex-col ml-64 p-4">
          {/* Search Bar */}
          <div className="max-w-[1400px] mx-auto px-6 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="search"
                placeholder="Search Documents"
                className="w-full max-w-md pl-10 pr-4 py-2 bg-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Get Started Section */}
          <div className="bg-gradient-to-r from-[#0A2472] via-[#0E4D92] to-[#1A237E] p-6">
            <div className="max-w-[1400px] mx-auto">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">Get Started</h2>
                  <p className="text-white/80">Login into your DigiLocker account to access authentic documents</p>
                  <div className="flex gap-3 mt-4">
                    <Button
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-white/90"
                      onClick={() => setShowSignIn(true)}
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
                <div className="w-24 h-24 bg-[#1E3A8A] rounded-full flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#2563EB] rounded-full flex items-center justify-center">
                    <LockKeyhole className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-[1400px] mx-auto p-6 space-y-8 flex-1">
            <HeroSection showSearch={false} />
            <DocumentsSection />
          </div>
        </div>
      </div>

      {/* Chatbot Widget */}
      <ChatbotWidget />

      <SignInModal isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
    </div>
  )
}
