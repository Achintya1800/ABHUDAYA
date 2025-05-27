import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LockKeyhole } from "lucide-react"
import HeroSection from "@/components/hero-section"
import DocumentsSection from "@/components/documents-section"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Get Started Section */}
      <div className="bg-gradient-to-r from-[#0A2472] via-[#0E4D92] to-[#1A237E] p-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Get Started</h2>
              <p className="text-white/80">Login into your DigiLocker account to access authentic documents</p>
              <div className="flex gap-3 mt-4">
                <Link href="/user-home">
                  <Button variant="secondary" className="bg-white text-blue-600 hover:bg-white/90">
                    Sign In
                  </Button>
                </Link>
                <Link href="/user-home">
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    Sign Up
                  </Button>
                </Link>
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

      {/* Rest of the content */}
      <div className="max-w-[1400px] mx-auto p-6 space-y-8">
        <HeroSection />
        <DocumentsSection />
      </div>
    </div>
  )
}

