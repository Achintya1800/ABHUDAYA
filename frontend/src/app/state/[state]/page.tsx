"use client"

import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function StatePage({ params }: { params: { state: string } }) {
  const documents = [
    {
      title: "Degree Certificate",
      institution: "North East Frontier Technical University",
      icon: "📄",
      color: "bg-blue-100",
    },
    {
      title: "Degree/ Diploma Marksheet",
      institution: "Apex Professional University",
      icon: "📄",
      color: "bg-blue-100",
    },
    {
      title: "Birth Certificate",
      institution: "Registrar General of India, Arunachal Pradesh",
      icon: "👶",
      color: "bg-green-100",
    },
    {
      title: "Character Certificate",
      institution: "eService (eDistrict), Arunachal Pradesh",
      icon: "📋",
      color: "bg-purple-100",
    },
    {
      title: "Diploma Certificate",
      institution: "Apex Professional University",
      icon: "🎓",
      color: "bg-gray-100",
    },
    {
      title: "Domicile Certificate",
      institution: "eService (eDistrict), Arunachal Pradesh",
      icon: "📜",
      color: "bg-orange-100",
    },
    {
      title: "Dependent Certificate",
      institution: "eService (eDistrict), Arunachal Pradesh",
      icon: "📄",
      color: "bg-blue-100",
    },
    {
      title: "Driving License",
      institution: "Transport Department, Arunachal Pradesh",
      icon: "🚗",
      color: "bg-green-100",
    },
    {
      title: "Death Certificate",
      institution: "Registrar General of India, Arunachal Pradesh",
      icon: "📜",
      color: "bg-red-100",
    },
  ]

  const stateNames: { [key: string]: string } = {
    "arunachal-pradesh": "Arunachal Pradesh",
    // Add other state mappings as needed
  }

  const stateName = stateNames[params.state] || params.state.replace(/-/g, " ")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <div className="flex items-center gap-4">
            <Link href="#">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zbhIeT0QEYcI3nbDDhGgmv3C6EIZEJ.png"
                  alt={stateName}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </div>
              <div>
                <h1 className="text-xl font-semibold">{stateName}</h1>
                <p className="text-sm text-gray-500">Documents: {documents.length}</p>
              </div>
            </div>
          </div>
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Mobile Search */}
        <div className="p-4 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="search"
              placeholder="Search"
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Documents List */}
        <div className="p-4">
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.title}
                className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:border-gray-300 cursor-pointer transition-all"
              >
                <div className={`w-12 h-12 ${doc.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl">{doc.icon}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="font-medium text-gray-900">{doc.title}</h3>
                  <p className="text-sm text-gray-500 truncate">{doc.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

