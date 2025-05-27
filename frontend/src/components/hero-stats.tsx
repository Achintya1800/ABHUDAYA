"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const stats = [
  {
    number: "207",
    label: "Government Department Integrations",
    bgColor: "bg-gradient-to-br from-[#E0FFE0]/40 to-[#F0FFF0]/60",
    textColor: "text-[#2E7D32]",
    icon: "/departments_stats_bg.png",
  },
  {
    number: "3000+",
    label: "Central and State Government Schemes",
    bgColor: "bg-gradient-to-br from-[#D0EFFF]/40 to-[#E3F2FD]/60",
    textColor: "text-[#1976D2]",
    icon: "/services_stats_bg.png",
  },
  {
    number: "23",
    label: "Official and Regional Languages",
    bgColor: "bg-gradient-to-br from-[#FFD0E0]/40 to-[#FFF0F7]/60",
    textColor: "text-[#E91E63]",
    icon: "/language_stats_bg.png",
  },
]

export function HeroStats() {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 mb-12">
      <div className="mb-8 text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">Welcome to ABHUDAYA</h1>
        <p className="text-gray-600 text-base md:text-lg">Unified Mobile Application for New-age Governance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ delay: index * 0.2, duration: 0.3 }}
            className={`${stat.bgColor} rounded-3xl p-6 flex items-start space-x-4 shadow-sm hover:shadow-md transition-all min-h-[200px]`}
          >
            <div className="flex-shrink-0 w-40 h-40 relative ">
              <Image
                src={stat.icon || "/placeholder.svg"}
                alt=""
                fill
                className="object-contain"
                sizes="(max-width: 80px) 100vw, 80px"
              />
            </div>
            <div className="pt-8 text-pretty flex flex-col justify-center  min-h-[80px]">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`text-3xl md:text-4xl font-bold ${stat.textColor} mb-1`}
              >
                {stat.number}
              </motion.div>
              <p className=" pd-8 text-gray-700 text-sm md:text-base font-medium leading-snug">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
