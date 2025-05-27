"use client"

import { useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"

const schemes = [
  {
    id: 1,
    name: "PM Awas Yojana",
    deadline: "31/03/2024",
    progress: 66,
    status: "In Progress",
    timeline: [
      { status: "Document Uploaded", date: "1 week ago", completed: true },
      { status: "Application Submitted", date: "2 weeks ago", completed: true },
      { status: "Pending Benefit", date: "Action Required", completed: false },
    ],
  },
  {
    id: 2,
    name: "PM Kisan Samman Nidhi",
    deadline: "30/06/2024",
    progress: 80,
    status: "Approved",
    timeline: [
      { status: "Benefit Received", date: "1 day ago", completed: true },
      { status: "Application Approved", date: "1 week ago", completed: true },
      { status: "Document Verification", date: "2 weeks ago", completed: true },
    ],
  },
]

export function AppliedSchemes() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev()
      setCurrentIndex((prev) => (prev === 0 ? schemes.length - 1 : prev - 1))
    }
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext()
      setCurrentIndex((prev) => (prev === schemes.length - 1 ? 0 : prev + 1))
    }
  }, [emblaApi])

  return (
    <Card className="border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <h2 className="text-xl font-semibold">My Applied Schemes</h2>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="deadline">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Deadline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline">Deadline</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {schemes.map((scheme) => (
            <CardContent className="flex-[0_0_100%] min-w-0 p-6 space-y-6" key={scheme.id}>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{scheme.name}</h3>
                  <span className="text-sm text-muted-foreground px-3 py-1 bg-gray-50 rounded-full border">
                    Deadline: {scheme.deadline}
                  </span>
                </div>

                <div className="space-y-2">
                  <Progress
                    value={scheme.progress}
                    className={`h-2 [&>div]:${scheme.status === "Approved" ? "bg-green-600" : "bg-blue-600"}`}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{scheme.progress}% Complete</span>
                    <span
                      className={
                        scheme.status === "Approved" ? "text-green-600 font-medium" : "text-orange-500 font-medium"
                      }
                    >
                      {scheme.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 pt-2">
                  {scheme.timeline.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className={`h-3 w-3 rounded-full ${item.completed ? "bg-green-500" : "bg-orange-500"}`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.status}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Submit Documents
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          ))}
        </div>
      </div>
      <CardContent className="p-4 border-t">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={scrollPrev} className="hover:bg-blue-50">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex gap-2">
            {schemes.map((_, index) => (
              <motion.div
                key={index}
                className={`transition-all duration-300 h-2 rounded-full ${
                  index === currentIndex ? "w-6 bg-blue-600" : "w-2 bg-gray-200"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          <Button variant="ghost" size="icon" onClick={scrollNext} className="hover:bg-blue-50">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

