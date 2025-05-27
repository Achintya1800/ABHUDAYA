"use client"

import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { HeroStats } from "@/components/hero-stats"
import { EligibleSchemes } from "@/components/eligible-schemes"
import { RecentActivities } from "@/components/recent-activities"
import { MonthlyEarnings } from "@/components/monthly-earnings"
import { LocalCenters } from "@/components/local-centers"
import Chatbot from "@/components/chatbot"
import Hatbot from "@/components/hatbot"
import ChatbotWidget from "@/components/chatbotWidget"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="flex pt-16">
        <Sidebar />

        <main className="flex-1 ml-[250px] p-6">
          <div className="max-w-[1600px] mx-auto">
            <HeroStats />

            <div className="grid gap-6">
              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <EligibleSchemes />
                </div>
                <RecentActivities />
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MonthlyEarnings />
                <LocalCenters />
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* <Hatbot/>
      <Chatbot /> */}
      <ChatbotWidget/>
    </div>
  )
}

