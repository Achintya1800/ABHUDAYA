"use client"

import { useEffect, useState } from "react"
import { SearchBar } from "../../components/search-bar"
import { Hero } from "../../components/hero"
import { Carousel } from "../../components/carousel"
import { TrendingSchemes } from "../../components/trending-schemes"
import { SchemeExplorer } from "../../components/scheme-explorer"
import { LocationPermissionDialog } from "@/components/location-permission-dialog"
import { BookmarkedSchemes } from "../../components/bookmarked-schemes"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import ChatbotWidget from "@/components/chatbotWidget"
export default function Page() {
  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<string[]>([])
  const [showLocationDialog, setShowLocationDialog] = useState(false)

  useEffect(() => {
    // Check if user has already responded to location prompt
    const hasRespondedToLocation = localStorage.getItem("locationPromptResponse")
    if (!hasRespondedToLocation) {
      setShowLocationDialog(true)
    }
  }, [])

  const toggleBookmark = (schemeId: string) => {
    setBookmarkedSchemes((prev) =>
      prev.includes(schemeId) ? prev.filter((id) => id !== schemeId) : [...prev, schemeId],
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar className="w-64 flex-shrink-0" />
        <main className="flex-1 flex flex-col ml-64 p-4">
          <Hero />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SearchBar />
            <Carousel bookmarkedSchemes={bookmarkedSchemes} toggleBookmark={toggleBookmark} />
            <TrendingSchemes bookmarkedSchemes={bookmarkedSchemes} toggleBookmark={toggleBookmark} />
            {bookmarkedSchemes.length > 0 && (
              <BookmarkedSchemes bookmarkedSchemes={bookmarkedSchemes} toggleBookmark={toggleBookmark} />
            )}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Explore Schemes</h2>
              <SchemeExplorer />
            </div>
          </div>
          <ChatbotWidget/>
          <LocationPermissionDialog
            open={showLocationDialog}
            onOpenChange={(open) => {
              setShowLocationDialog(open)
              // Store that user has responded to prevent future prompts
              localStorage.setItem("locationPromptResponse", "true")
            }}
          />
        </main>
      </div>
    </div>
  )
}
