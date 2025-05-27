"use client"

import { useState } from "react"
import { Search, Upload } from "lucide-react"
import { Bebas_Neue } from "next/font/google"
import { Button } from "@/components/ui/button"
import UploadModal from "./upload-modal"

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
})

interface HeroSectionProps {
  showSearch?: boolean
}

export default function HeroSection({ showSearch = false }: HeroSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [showUploadModal, setShowUploadModal] = useState(false)

  const slides = [
    {
      title: "Securely access your documents anytime, anywhere on",
      highlight: "DigiLocker",
    },
    {
      title: "Experience New Intuitive Design with",
      highlight: "DigiLocker",
    },
  ]

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search Bar - Only show in dashboard */}
          {showSearch && (
            <div className="pt-6 pb-4">
              <div className="relative max-w-3xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
                <input
                  type="search"
                  placeholder="Search Documents"
                  className="w-full pl-14 pr-4 py-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-300 text-lg"
                />
              </div>
            </div>
          )}

          <div className="relative z-10 py-16 md:py-24 lg:py-32">
            <div className="flex flex-col items-center text-center">
              <div className="max-w-3xl mx-auto">
                <h1 className={`${bebasNeue.className} text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6`}>
                  {slides[activeSlide].title}{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    {slides[activeSlide].highlight}
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                  Access, share, and manage your important documents securely from anywhere in the world.
                </p>
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-purple-600 border-purple-600 hover:bg-purple-600 hover:text-white text-lg px-8 py-3"
                    onClick={() => setShowUploadModal(true)}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Manual Upload
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${index === activeSlide ? "bg-white w-8" : "bg-white/50"}`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>

      {/* My Documents Section - Only show in dashboard */}
      {showSearch && (
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-semibold mb-6">My Documents</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📄</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 truncate">APAAR ID</h3>
                  <p className="text-sm text-gray-500 truncate">Academic Bank of Credits</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🆔</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 truncate">Aadhaar Card</h3>
                  <p className="text-sm text-gray-500 truncate">Unique Identification Authority</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🚗</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-gray-900 truncate">Driving License</h3>
                  <p className="text-sm text-gray-500 truncate">Motor Vehicle Department</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-6">
              *Digilocker 'Issued Document' are at par with original document as per IT ACT, 2000
            </p>
          </div>
        </div>
      )}
      <UploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} />
    </div>
  )
}

