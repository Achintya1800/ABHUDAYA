"use client"

import { Search, Grid2X2, MoreVertical } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"

const services = [
  {
    title: "Aadhar bank Link status",
    department: "Aaple Sarkar Maha DBT",
    logo: "maha-dbt",
  },
  {
    title: "Age Nationality and Domicile",
    department: "Aaple Sarkar",
    logo: "aaple-sarkar",
  },
  {
    title: "Agriculturist Certificate",
    department: "Aaple Sarkar",
    logo: "aaple-sarkar",
  },
  {
    title: "All Schemes",
    department: "Aaple Sarkar Maha DBT",
    logo: "maha-dbt",
  },
  {
    title: "Apply for Government Services",
    department: "Aaple Sarkar",
    logo: "aaple-sarkar",
  },
  {
    title: "Apply for Non Creamy Layer",
    department: "Aaple Sarkar",
    logo: "aaple-sarkar",
  },
  {
    title: "Apply for Pandit Services",
    department: "Aaple Sarkar",
    logo: "aaple-sarkar",
  },
  {
    title: "Cancelled scheme",
    department: "Aaple Sarkar Maha DBT",
    logo: "maha-dbt",
  },
]

export default function MaharashtraPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[250px]">
          {/* Search Section */}
          <div className="sticky top-0 z-50 bg-[#f0f0f0] shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-orange-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search In Services"
                  className="h-12 pl-12 pr-4 bg-white rounded-lg border-none text-gray-600 text-lg shadow-sm hover:shadow-md transition-shadow focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
            </div>
          </div>

          {/* Banner Section */}
          <div className="relative overflow-hidden mx-4 mt-4">
            <Button
              variant="ghost"
              className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm hover:bg-white/95 rounded-lg"
              size="icon"
            >
              <Grid2X2 className="h-5 w-5" />
            </Button>

            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 z-10" />
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wSjpQea3DdmhIfwDCIiadZhwvPlKhi.png"
              alt="Maharashtra landmarks banner showing Siddhivinayak Temple, Gateway of India, Western Ghats, and CST station"
              className="w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-[0.2em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                Maharashtra Government Services
              </h1>
            </div>
          </div>

          {/* Services Grid */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredServices.map((service) => (
                <Card
                  key={service.title}
                  className="relative group hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 rounded-lg overflow-hidden"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="absolute right-2 top-2 h-8 w-8 p-0 opacity-60 hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Share Service</DropdownMenuItem>
                      <DropdownMenuItem>Add to Favorites</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="p-6 flex flex-col items-center text-center cursor-pointer">
                    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      <img
                        src={
                          service.logo === "maha-dbt"
                            ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4SRErj5gkstoOPVLBYMY6kQxzpTXzD.png#x=152&y=468&w=40&h=40"
                            : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4SRErj5gkstoOPVLBYMY6kQxzpTXzD.png#x=444&y=468&w=40&h=40"
                        }
                        alt={`${service.title} logo`}
                        className="h-16 w-auto"
                      />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900 text-lg group-hover:text-orange-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-500">{service.department}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
