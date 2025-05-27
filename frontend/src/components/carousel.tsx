"use client"

import Link from "next/link"
import { Bookmark, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import {
  Carousel as CarouselComponent,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useState } from "react"
import { SchemeDetailModal } from "@/components/scheme-detail-modal"

const recommendedSchemes = [
  {
    id: "1",
    ministry: "Ministry Of Defence",
    title: "AFFDF-Financial Assistance For Treatment Of Serious Diseases",
    color: "from-purple-100 to-pink-100",
    icon: "🏥",
    deadline: "2025-12-31",
    beneficiaries: "5000+",
    status: "Active",
    category: "Health & Wellness",
  },
  {
    id: "2",
    ministry: "Ministry of Education",
    title: "AICTE - Distinguished Chair Professor Fellowship",
    color: "from-emerald-100 to-teal-100",
    icon: "🎓",
    deadline: "2025-09-30",
    beneficiaries: "100+",
    status: "Active",
    category: "Education & Learning",
  },
  {
    id: "3",
    ministry: "Ministry of Education",
    title: "AICTE - Research Promotion Scheme (RPS)",
    color: "from-blue-100 to-cyan-100",
    icon: "🔬",
    deadline: "2025-08-15",
    beneficiaries: "1000+",
    status: "Active",
    category: "Education & Learning",
  },
  {
    id: "4",
    ministry: "Ministry of Agriculture",
    title: "PM-KISAN - Income Support for Farmers",
    color: "from-green-100 to-lime-100",
    icon: "🌾",
    deadline: "Ongoing",
    beneficiaries: "10M+",
    status: "Active",
    category: "Agriculture,Rural & Environment",
  },
  {
    id: "5",
    ministry: "Ministry of Health",
    title: "Ayushman Bharat - Health Insurance for All",
    color: "from-red-100 to-orange-100",
    icon: "🏥",
    deadline: "Ongoing",
    beneficiaries: "50M+",
    status: "Active",
    category: "Health & Wellness",
  },
  {
    id: "6",
    ministry: "Ministry of Housing",
    title: "Pradhan Mantri Awas Yojana - Housing for All",
    color: "from-yellow-100 to-amber-100",
    icon: "🏠",
    deadline: "2024-12-31",
    beneficiaries: "20M+",
    status: "Active",
    category: "Housing & Shelter",
  },
]

interface CarouselProps {
  bookmarkedSchemes: string[]
  toggleBookmark: (schemeId: string) => void
}

export function Carousel({ bookmarkedSchemes, toggleBookmark }: CarouselProps) {
  const [selectedScheme, setSelectedScheme] = useState<string | null>(null)

  return (
    <div className="mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Recommended Schemes</h2>
        <div className="flex items-center gap-2">
          <Link href="/schemes" className="text-sm text-blue-600 hover:text-blue-700">
            View All (598)
          </Link>
        </div>
      </div>
      <CarouselComponent className="w-full">
        <CarouselContent>
          {recommendedSchemes.map((scheme) => (
            <CarouselItem key={scheme.id} className="md:basis-1/2 lg:basis-1/3">
              <div onClick={() => setSelectedScheme(scheme.id)}>
                <Card className="relative overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-br ${scheme.color} opacity-50`} />
                  <CardHeader className="relative">
                    <CardTitle className="text-lg font-medium text-gray-800 flex items-center gap-2">
                      <span className="text-2xl">{scheme.icon}</span>
                      {scheme.ministry}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-xl font-semibold text-gray-900 mb-4">{scheme.title}</p>
                    <div className="flex items-center gap-4 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{scheme.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span className="text-sm">{scheme.beneficiaries}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="relative">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-gray-800 text-sm font-medium bg-green-100 px-2 py-1 rounded">
                        {scheme.status}
                      </span>
                      <button
                        className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleBookmark(scheme.id)
                        }}
                      >
                        <Bookmark
                          className={`h-5 w-5 ${
                            bookmarkedSchemes.includes(scheme.id) ? "fill-yellow-400 text-yellow-400" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </CardFooter>
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

