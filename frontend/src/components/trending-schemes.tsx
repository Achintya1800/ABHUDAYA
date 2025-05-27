"use client"

import Link from "next/link"
import { Bookmark } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react"
import { SchemeDetailModal } from "@/components/scheme-detail-modal"

const trendingSchemes = [
  {
    id: "1",
    title: "Digital India Internship Scheme",
    ministry: "Ministry of Electronics & IT",
    color: "bg-blue-50",
    icon: "💻",
    category: "Science, IT & Communications",
  },
  {
    id: "2",
    title: "PM Vishwakarma Yojana",
    ministry: "Ministry of Micro, Small & Medium Enterprises",
    color: "bg-orange-50",
    icon: "🛠️",
    category: "Skills & Employment",
  },
  {
    id: "3",
    title: "Pradhan Mantri Kisan Samman Nidhi",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    color: "bg-green-50",
    icon: "🌾",
    category: "Agriculture,Rural & Environment",
  },
  {
    id: "4",
    title: "National Electric Mobility Mission",
    ministry: "Ministry of Heavy Industries",
    color: "bg-yellow-50",
    icon: "🚗",
    category: "Transport & Infrastructure",
  },
  {
    id: "5",
    title: "Skill India Mission",
    ministry: "Ministry of Skill Development and Entrepreneurship",
    color: "bg-purple-50",
    icon: "🎓",
    category: "Skills & Employment",
  },
  {
    id: "6",
    title: "Swachh Bharat Mission",
    ministry: "Ministry of Housing and Urban Affairs",
    color: "bg-teal-50",
    icon: "🧹",
    category: "Utility & Sanitation",
  },
]

interface TrendingSchemesProps {
  bookmarkedSchemes: string[]
  toggleBookmark: (schemeId: string) => void
}

export function TrendingSchemes({ bookmarkedSchemes, toggleBookmark }: TrendingSchemesProps) {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null)

  return (
    <div className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Trending Schemes</h2>
        <div className="flex items-center gap-2">
          <Link href="/schemes" className="text-sm text-blue-600 hover:text-blue-700">
            View All
          </Link>
        </div>
      </div>
      <CarouselComponent className="w-full">
        <CarouselContent>
          {trendingSchemes.map((scheme) => (
            <CarouselItem key={scheme.id} className="md:basis-1/3 lg:basis-1/4">
              <div onClick={() => setSelectedScheme(scheme.id)}>
                <Card
                  className={`relative overflow-hidden ${scheme.color} hover:shadow-md transition-shadow cursor-pointer`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{scheme.icon}</span>
                      <button
                        className="rounded-full bg-white/50 p-1.5 text-gray-600 hover:bg-white/80"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleBookmark(scheme.id)
                        }}
                      >
                        <Bookmark
                          className={`h-4 w-4 ${
                            bookmarkedSchemes.includes(scheme.id) ? "fill-yellow-400 text-yellow-400" : ""
                          }`}
                        />
                      </button>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{scheme.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-1">{scheme.ministry}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </CarouselComponent>
      {selectedScheme && (
        <SchemeDetailModal
          scheme={{
            id: "1",
            title: selectedScheme,
            ministry: "Ministry of Example",
            description: "This is an example scheme description.",
            location: "All India",
            tags: ["Example", "Scheme"],
            details: "This is an example scheme with more details.",
            benefits: {
              amount: "Example benefit amount",
              disbursal: ["Example disbursal step 1", "Example disbursal step 2"],
            },
            eligibility: ["Example eligibility criteria 1", "Example eligibility criteria 2"],
            applicationProcess: {
              steps: [
                { title: "Step 1", description: "Example step 1 description" },
                { title: "Step 2", description: "Example step 2 description" },
              ],
            },
            documents: ["Example document 1", "Example document 2"],
            faq: [
              { question: "Example question 1?", answer: "Example answer 1" },
              { question: "Example question 2?", answer: "Example answer 2" },
            ],
            sources: ["Example source 1", "Example source 2"],
          }}
          onClose={() => setSelectedScheme(null)}
        />
      )}
    </div>
  )
}

