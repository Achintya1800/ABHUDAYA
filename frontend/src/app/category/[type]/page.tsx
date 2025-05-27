import { ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CategoryPage({ params }: { params: { type: string } }) {
  const documents = [
    {
      title: "Driving License",
      count: "38 Documents",
      icon: "🚗",
      color: "text-green-600",
    },
    {
      title: "Vehicle Registration Certificate",
      count: "37 Documents",
      icon: "🚙",
      color: "text-orange-600",
    },
    {
      title: "Ration Card",
      count: "30 Documents",
      icon: "🏪",
      color: "text-emerald-600",
    },
    {
      title: "Universal Account Number Card",
      count: "2 Documents",
      icon: "💳",
      color: "text-blue-600",
    },
    {
      title: "Vehicle Registration Tax Receipt",
      count: "2 Documents",
      icon: "📄",
      color: "text-gray-600",
    },
    {
      title: "Aadhaar Card",
      count: "1 Document",
      icon: "🆔",
      color: "text-purple-600",
    },
    {
      title: "Medical Certificate",
      count: "1 Document",
      icon: "🏥",
      color: "text-cyan-600",
    },
    {
      title: "PAN Verification Record",
      count: "1 Document",
      icon: "📋",
      color: "text-indigo-600",
    },
    {
      title: "Motor Vehicle Insurance Certificate",
      count: "1 Document",
      icon: "📜",
      color: "text-rose-600",
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
        <div>
          <h1 className="text-xl font-semibold capitalize">{params.type.replace(/-/g, " ")}</h1>
          <p className="text-sm text-gray-500">Documents: {documents.length}</p>
        </div>
      </div>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc.title}
            className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:border-gray-300 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                <span className="text-2xl">{doc.icon}</span>
              </div>
              <div>
                <h3 className="font-medium">{doc.title}</h3>
                <p className={`text-sm ${doc.color}`}>{doc.count}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        ))}
      </div>
    </div>
  )
}

