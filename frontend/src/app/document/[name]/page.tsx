import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const documents = [
  {
    name: "UAN Card",
    icon: "🆔",
    bgColor: "bg-red-50",
    description: "Universal Account Number for Employee Provident Fund",
  },
  {
    name: "Driving License",
    icon: "🚗",
    bgColor: "bg-green-50",
    description: "Official document permitting an individual to operate motor vehicles",
  },
  {
    name: "Registration of Vehicles",
    icon: "🚙",
    bgColor: "bg-orange-50",
    description: "Official record of vehicle ownership and details",
  },
  {
    name: "LAN Card",
    icon: "💳",
    bgColor: "bg-blue-50",
    description: "Loan Account Number card for tracking loan details",
  },
  { name: "Class X Certificate", icon: "📚", bgColor: "bg-emerald-50", description: "Secondary School Certificate" },
  {
    name: "Class XII Certificate",
    icon: "🎓",
    bgColor: "bg-cyan-50",
    description: "Higher Secondary School Certificate",
  },
  { name: "PAN Card", icon: "💼", bgColor: "bg-indigo-50", description: "Permanent Account Number for tax purposes" },
  {
    name: "Income Certificate",
    icon: "📊",
    bgColor: "bg-violet-50",
    description: "Official document stating an individual's income",
  },
]

export default function DocumentPage({ params }: { params: { name: string } }) {
  const document = documents.find((doc) => doc.name.toLowerCase().replace(/ /g, "-") === params.name)

  if (!document) {
    return <div>Document not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link href="/user-home" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to User Home
      </Link>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <div className={`w-16 h-16 ${document.bgColor} rounded-full flex items-center justify-center mr-4`}>
            <span className="text-4xl">{document.icon}</span>
          </div>
          <h1 className="text-2xl font-bold">{document.name}</h1>
        </div>
        <p className="text-gray-600 mb-6">{document.description}</p>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Important Information</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>This document is important for various official purposes.</li>
            <li>Keep it up to date and easily accessible.</li>
            <li>Ensure all information on the document is accurate and current.</li>
            <li>Report any loss or theft of this document immediately to the relevant authorities.</li>
          </ul>
        </div>
        <div className="mt-8">
          <Button>Request Document</Button>
        </div>
      </div>
    </div>
  )
}

