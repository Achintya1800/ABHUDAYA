import {
  Building2,
  GraduationCap,
  Heart,
  Home,
  Briefcase,
  Users,
  Trophy,
  Bus,
  PlaneTakeoff,
  Wrench,
  Users2,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    icon: Building2,
    title: "Banking,Financial Services",
    count: "214 Schemes",
    color: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    icon: GraduationCap,
    title: "Education & Learning",
    count: "756 Schemes",
    color: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    icon: Heart,
    title: "Health & Wellness",
    count: "212 Schemes",
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Home,
    title: "Housing & Shelter",
    count: "93 Schemes",
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Briefcase,
    title: "Skills & Employment",
    count: "244 Schemes",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Users,
    title: "Social welfare & Empowerment",
    count: "1226 Schemes",
    color: "bg-pink-100",
    iconColor: "text-pink-600",
  },
  {
    icon: Trophy,
    title: "Sports & Culture",
    count: "116 Schemes",
    color: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    icon: Bus,
    title: "Transport & Infrastructure",
    count: "51 Schemes",
    color: "bg-cyan-100",
    iconColor: "text-cyan-600",
  },
  {
    icon: PlaneTakeoff,
    title: "Travel & Tourism",
    count: "35 Schemes",
    color: "bg-amber-100",
    iconColor: "text-amber-600",
  },
  {
    icon: Wrench,
    title: "Utility & Sanitation",
    count: "35 Schemes",
    color: "bg-rose-100",
    iconColor: "text-rose-600",
  },
  {
    icon: Users2,
    title: "Women and Child",
    count: "361 Schemes",
    color: "bg-lime-100",
    iconColor: "text-lime-600",
  },
]

export function ExploreCategories() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Explore schemes</h2>
        <span className="text-sm text-gray-600">View All</span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const Icon = category.icon
          return (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardContent className="flex items-center gap-4 p-4">
                <div className={`rounded-lg ${category.color} p-3`}>
                  <Icon className={`h-6 w-6 ${category.iconColor}`} />
                </div>
                <div>
                  <h3 className="font-semibold">{category.title}</h3>
                  <p className="text-sm text-gray-600">{category.count}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

