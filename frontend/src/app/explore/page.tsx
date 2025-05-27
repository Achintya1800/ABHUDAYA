import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ChatbotWidget from "@/components/chatbotWidget"
export default function ExplorePage() {
  const popularDocuments = [
    {
      title: "Aadhaar Card",
      image: "/placeholder.svg",
      gradient: "from-[#FFE5D9] to-[#B7E5D8]",
    },
    {
      title: "PAN Card",
      image: "/placeholder.svg",
      gradient: "from-[#D9F2FF] to-[#B7D5E5]",
    },
    {
      title: "Driving License",
      image: "/placeholder.svg",
      gradient: "from-[#E5D9FF] to-[#E5B7E5]",
    },
    {
      title: "Covid Certificate",
      image: "/placeholder.svg",
      gradient: "from-[#FFD9F2] to-[#E5B7D5]",
    },
  ]

  const newDocuments = [
    {
      title: "Contractor License",
      institution: "RTPS Assam",
      icon: "📄",
    },
    {
      title: "Unique Disability Card",
      institution: "Department of Empowerment",
      icon: "🆔",
    },
    {
      title: "Boat Registration",
      institution: "RTPS Assam",
      icon: "🚤",
    },
    {
      title: "Retail License",
      institution: "Department of Health",
      icon: "🏪",
    },
  ]

  const trendingDocuments = [
    {
      title: "Aadhaar Card",
      institution: "Unique Identification Authority",
      icon: "🆔",
    },
    {
      title: "PAN Verification Record",
      institution: "Income Tax Department",
      icon: "📋",
    },
    {
      title: "Driving License",
      institution: "Motor Vehicle Department",
      icon: "🚗",
    },
    {
      title: "UAN Card",
      institution: "Employees & Provident Fund",
      icon: "💳",
    },
  ]

  return (
    <div className="max-w-[1400px] mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">Explore</h1>
      </div>

      {/* Most Popular Documents */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Most Popular Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularDocuments.map((doc) => (
            <div
              key={doc.title}
              className={`relative h-48 rounded-xl overflow-hidden bg-gradient-to-br ${doc.gradient} p-4 cursor-pointer`}
            >
              <h3 className="text-lg font-medium mb-2">{doc.title}</h3>
              <div className="absolute right-0 bottom-0 w-32 h-32">
                <Image
                  src={doc.image || "/placeholder.svg"}
                  alt={doc.title}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newly Added Documents */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Newly Added Documents</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">View All (10)</span>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {newDocuments.map((doc) => (
            <div
              key={doc.title}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-xl">{doc.icon}</span>
              </div>
              <div>
                <h3 className="font-medium">{doc.title}</h3>
                <p className="text-sm text-gray-500">{doc.institution}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trending Documents */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Trending Documents</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">View All (7)</span>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingDocuments.map((doc) => (
            <div
              key={doc.title}
              className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-xl">{doc.icon}</span>
              </div>
              <div>
                <h3 className="font-medium">{doc.title}</h3>
                <p className="text-sm text-gray-500">{doc.institution}</p>
              </div>
              {/* <ChatbotWidget/> */}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

