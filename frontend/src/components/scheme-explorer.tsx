"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

type SchemeType = "categories" | "states" | "ministries"

const schemeData = {
  categories: [
    { name: "Agriculture,Rural & Environment", schemes: 408, color: "bg-green-50", emoji: "🌾" },
    { name: "Banking,Financial Services and Insurance", schemes: 214, color: "bg-orange-50", emoji: "🏦" },
    { name: "Business & Entrepreneurship", schemes: 425, color: "bg-pink-50", emoji: "💼" },
    { name: "Education & Learning", schemes: 756, color: "bg-red-50", emoji: "📚" },
    { name: "Health & Wellness", schemes: 212, color: "bg-green-50", emoji: "🏥" },
    { name: "Housing & Shelter", schemes: 93, color: "bg-blue-50", emoji: "🏠" },
    { name: "Public Safety,Law & Justice", schemes: 10, color: "bg-sky-50", emoji: "⚖️" },
    { name: "Science, IT & Communications", schemes: 61, color: "bg-amber-50", emoji: "🔬" },
    { name: "Skills & Employment", schemes: 244, color: "bg-red-50", emoji: "🛠️" },
    { name: "Social welfare & Empowerment", schemes: 1226, color: "bg-purple-50", emoji: "🤝" },
    { name: "Sports & Culture", schemes: 116, color: "bg-green-50", emoji: "🏅" },
    { name: "Transport & Infrastructure", schemes: 51, color: "bg-blue-50", emoji: "🚆" },
    { name: "Travel & Tourism", schemes: 35, color: "bg-amber-50", emoji: "✈️" },
    { name: "Utility & Sanitation", schemes: 35, color: "bg-rose-50", emoji: "🚰" },
    { name: "Women and Child", schemes: 361, color: "bg-lime-50", emoji: "👩‍👧" },
  ],
  states: [
    { name: "Andhra Pradesh", schemes: 68, color: "bg-sky-50", emoji: "🌊" },
    { name: "Arunachal Pradesh", schemes: 41, color: "bg-amber-50", emoji: "🏔️" },
    { name: "Assam", schemes: 54, color: "bg-red-50", emoji: "🍵" },
    { name: "Bihar", schemes: 95, color: "bg-purple-50", emoji: "🕉️" },
    { name: "Chhattisgarh", schemes: 84, color: "bg-blue-50", emoji: "🌳" },
    { name: "Goa", schemes: 137, color: "bg-red-50", emoji: "🏖️" },
    { name: "Gujarat", schemes: 177, color: "bg-purple-50", emoji: "🦁" },
    { name: "Haryana", schemes: 161, color: "bg-green-50", emoji: "🌾" },
    { name: "Himachal Pradesh", schemes: 68, color: "bg-blue-50", emoji: "⛰️" },
    { name: "Jharkhand", schemes: 87, color: "bg-pink-50", emoji: "⛏️" },
    { name: "Karnataka", schemes: 61, color: "bg-purple-50", emoji: "🐘" },
    { name: "Kerala", schemes: 75, color: "bg-lime-50", emoji: "🥥" },
    { name: "Madhya Pradesh", schemes: 185, color: "bg-blue-50", emoji: "🐯" },
    { name: "Maharashtra", schemes: 87, color: "bg-amber-50", emoji: "🦁" },
    { name: "Manipur", schemes: 33, color: "bg-red-50", emoji: "💃" },
  ],
  ministries: [
    { name: "Ministry Of Agriculture and Farming", schemes: 48, color: "bg-amber-50", emoji: "🚜" },
    { name: "Ministry Of Chemicals And Fertilizers", schemes: 2, color: "bg-red-50", emoji: "🧪" },
    { name: "Ministry Of Commerce And Industry", schemes: 29, color: "bg-orange-50", emoji: "🏭" },
    { name: "Ministry Of Communication", schemes: 5, color: "bg-green-50", emoji: "📡" },
    { name: "Ministry Of Consumer Affairs", schemes: 1, color: "bg-blue-50", emoji: "🛒" },
    { name: "Ministry Of Culture", schemes: 13, color: "bg-amber-50", emoji: "🎭" },
    { name: "Ministry Of Defence", schemes: 11, color: "bg-purple-50", emoji: "🛡️" },
    { name: "Ministry Of Earth Sciences", schemes: 1, color: "bg-blue-50", emoji: "🌍" },
    { name: "Ministry Of Environment,forest", schemes: 2, color: "bg-purple-50", emoji: "🌳" },
    { name: "Ministry Of External Affairs", schemes: 4, color: "bg-cyan-50", emoji: "🌐" },
    { name: "Ministry Of Finance", schemes: 18, color: "bg-pink-50", emoji: "💰" },
    { name: "Ministry Of Health & Family Welfare", schemes: 14, color: "bg-green-50", emoji: "🏥" },
    { name: "Ministry Of Home Affairs", schemes: 10, color: "bg-lime-50", emoji: "🏛️" },
    { name: "Ministry Of Housing & Urban Affairs", schemes: 5, color: "bg-blue-50", emoji: "🏙️" },
    { name: "Ministry Of Information And Broadcasting", schemes: 1, color: "bg-red-50", emoji: "📺" },
  ],
}

export function SchemeExplorer() {
  const [activeType, setActiveType] = useState<SchemeType>("categories")

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 mb-8">
        {(["categories", "states", "ministries"] as const).map((type) => (
          <Button
            key={type}
            onClick={() => setActiveType(type)}
            variant={activeType === type ? "default" : "outline"}
            className={`rounded-full ${
              activeType === type ? "bg-blue-600 text-white" : "text-blue-600 hover:bg-blue-50"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {schemeData[activeType].map((item, index) => (
          <Link href={`/schemes?${activeType}=${encodeURIComponent(item.name)}`} key={index}>
            <Button
              variant="outline"
              className={`w-full h-auto justify-start gap-2 sm:gap-4 ${item.color} hover:bg-opacity-80 transition-all duration-200`}
            >
              <div className="flex-shrink-0 text-2xl">{item.emoji}</div>
              <div className="flex-grow text-left overflow-hidden">
                <h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">{item.name}</h3>
                <p className="text-xs sm:text-sm text-blue-600 truncate">{item.schemes} Schemes</p>
              </div>
              <ChevronRight className="flex-shrink-0 h-5 w-5 text-gray-400" />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}

