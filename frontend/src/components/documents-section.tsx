"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DocumentsSection() {
  const [showAllStates, setShowAllStates] = useState(false)

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

  const states = [
    { name: "Andhra Pradesh", emblem: "🏛️" },
    { name: "Arunachal Pradesh", emblem: "🗻" },
    { name: "Assam", emblem: "🦏" },
    { name: "Bihar", emblem: "🕉️" },
    { name: "Chhattisgarh", emblem: "🌾" },
    { name: "Goa", emblem: "🏖️" },
    { name: "Gujarat", emblem: "🦁" },
    { name: "Haryana", emblem: "🌾" },
    { name: "Himachal Pradesh", emblem: "🏔️" },
    { name: "Jharkhand", emblem: "🌳" },
    { name: "Karnataka", emblem: "🐘" },
    { name: "Kerala", emblem: "🌴" },
    { name: "Madhya Pradesh", emblem: "🐅" },
    { name: "Maharashtra", emblem: "🦁" },
    { name: "Manipur", emblem: "🦚" },
    { name: "Meghalaya", emblem: "🌄" },
    { name: "Mizoram", emblem: "🌿" },
    { name: "Nagaland", emblem: "🦅" },
    { name: "Odisha", emblem: "🛕" },
    { name: "Punjab", emblem: "🌾" },
    { name: "Rajasthan", emblem: "🏰" },
    { name: "Sikkim", emblem: "🏔️" },
    { name: "Tamil Nadu", emblem: "🕍" },
    { name: "Telangana", emblem: "🕌" },
    { name: "Tripura", emblem: "🌴" },
    { name: "Uttar Pradesh", emblem: "🏹" },
    { name: "Uttarakhand", emblem: "🏞️" },
    { name: "West Bengal", emblem: "🐯" },
    { name: "Andaman and Nicobar Islands", emblem: "🏝️" },
    { name: "Chandigarh", emblem: "🏙️" },
    { name: "Dadra and Nagar Haveli and Daman and Diu", emblem: "🌊" },
    { name: "Delhi", emblem: "🏛️" },
    { name: "Jammu and Kashmir", emblem: "🏔️" },
    { name: "Ladakh", emblem: "🏔️" },
    { name: "Lakshadweep", emblem: "🏝️" },
    { name: "Puducherry", emblem: "🕊️" },
  ]

  const categories = [
    { name: "ID", count: "15 Documents", icon: "📱", bgColor: "bg-purple-50" },
    { name: "Insurance", count: "25 Documents", icon: "🏥", bgColor: "bg-amber-50" },
    { name: "License", count: "10 Documents", icon: "📄", bgColor: "bg-rose-50" },
    { name: "Government Certificate", count: "30 Documents", icon: "🏛️", bgColor: "bg-purple-50" },
    { name: "Education", count: "15 Documents", icon: "🎓", bgColor: "bg-pink-50" },
    { name: "Others", count: "20+ Documents", icon: "📁", bgColor: "bg-orange-50" },
  ]

  const visibleStates = showAllStates ? states : states.slice(0, 20)

  return (
    <>
      {/* Documents Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-base font-medium">Documents You Might Need</h2>
          <Link href="/explore" className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Explore more
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-4">
          {documents.map((doc) => (
            <Link
              href={`/document/${doc.name.toLowerCase().replace(/ /g, "-")}`}
              key={doc.name}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className={`w-12 h-12 rounded-lg ${doc.bgColor} flex items-center justify-center mb-2`}>
                <span className="text-2xl">{doc.icon}</span>
              </div>
              <span className="text-xs text-center text-gray-600">{doc.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* States Section */}
      <section>
        <h2 className="text-base font-medium mb-4">State Documents</h2>
        <div className="grid grid-cols-5 lg:grid-cols-10 gap-4">
          {visibleStates.map((state) => (
            <Link
              href={`/state/${state.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
              key={state.name}
              className="flex flex-col items-center p-3 cursor-pointer group hover:scale-105 transition-all duration-200"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md group-hover:from-white group-hover:to-gray-50 transition-all">
                <span className="text-2xl transform group-hover:scale-110 transition-transform">{state.emblem}</span>
              </div>
              <span className="text-[11px] text-center text-gray-600 leading-tight font-medium group-hover:text-gray-900">
                {state.name}
              </span>
            </Link>
          ))}
        </div>
        {!showAllStates && (
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={() => setShowAllStates(true)}>
              Show More States
            </Button>
          </div>
        )}
      </section>

      {/* Explore Documents */}
      <section>
        <h2 className="text-base font-medium mb-4">Explore Document</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link
              href={`/category/${category.name.toLowerCase()}`}
              key={category.name}
              className="flex items-center p-4 rounded-xl border hover:border-gray-300 cursor-pointer transition-colors"
            >
              <div className={`w-12 h-12 ${category.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <div>
                <h3 className="font-medium text-sm">{category.name}</h3>
                <p className="text-xs text-gray-500">{category.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

