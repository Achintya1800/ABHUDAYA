"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, CreditCard } from "lucide-react"
import { motion } from "framer-motion"

const activities = [
  {
    id: 1,
    title: "Document Uploaded",
    description: "Aadhaar Card uploaded successfully",
    date: "1 week ago",
    icon: FileText,
    color: "blue",
  },
  {
    id: 2,
    title: "Eligibility Check Completed",
    description: "You're eligible for 3 new schemes",
    date: "2 weeks ago",
    icon: CheckCircle,
    color: "green",
  },
  {
    id: 3,
    title: "Benefit Received",
    description: "₹2000 credited to your account",
    date: "1 month ago",
    icon: CreditCard,
    color: "purple",
  },
]

export function RecentActivities() {
  return (
    <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="border-b p-4">
        <h2 className="text-xl font-semibold">Recent Activities</h2>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-4 group"
            >
              <div
                className={`flex-shrink-0 w-10 h-10 bg-${activity.color}-50 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110`}
              >
                <activity.icon className={`h-5 w-5 text-${activity.color}-600`} />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{activity.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <Button variant="link" className="w-full mt-6 text-blue-600 hover:text-blue-700 transition-colors">
            View More
          </Button>
        </motion.div>
      </CardContent>
    </Card>
  )
}

