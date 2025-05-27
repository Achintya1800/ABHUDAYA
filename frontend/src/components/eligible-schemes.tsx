"use client"

import { useState, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const schemes = [
  {
    id: 1,
    name: "Ayushman Bharat",
    description:
      "Comprehensive healthcare protection scheme providing quality and affordable healthcare to millions of Indians.",
    eligibility: 70,
    benefits: ["Health coverage up to ₹5 lakhs", "Cashless treatment"],
  },
  {
    id: 2,
    name: "PM Kisan Samman Nidhi",
    description: "Direct financial support to empower agricultural families across India.",
    eligibility: 85,
    benefits: ["Financial support for farmer families", "₹6000 per year"],
  },
  {
    id: 3,
    name: "PM Awas Yojana",
    description: "Making the dream of owning a home a reality through affordable housing solutions.",
    eligibility: 90,
    benefits: ["Housing for all", "Interest subsidy on home loans"],
  },
]

export function EligibleSchemes() {
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
    <Card className="border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between border-b p-6">
        <h2 className="text-xl font-semibold text-gray-900">Eligible Schemes</h2>
        <span className="text-sm text-gray-500 bg-gray-50 px-4 py-1 rounded-full">
          Scheme {currentIndex + 1} of {schemes.length}
        </span>
      </CardHeader>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {schemes.map((scheme) => (
            <CardContent key={scheme.id} className="flex-[0_0_100%] min-w-0 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Scheme Title and Description */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <Heart className="w-5 h-5 text-blue-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{scheme.name}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{scheme.description}</p>
                  </div>

                  {/* Eligibility Score */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-600">Eligibility Score</span>
                      <span className="text-sm font-semibold text-blue-600">{scheme.eligibility}%</span>
                    </div>
                    <Progress value={scheme.eligibility} className="h-2 bg-blue-100" />
                  </div>

                  {/* Key Benefits */}
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-medium text-gray-900">Key Benefits</h4>
                    <ul className="space-y-2">
                      {scheme.benefits.map((benefit, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-2 text-gray-600 text-sm"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-2">
                    <Button className="flex-1 bg-[#1e1b4b] hover:bg-[#1e1b4b]/90 text-white">Apply Now</Button>
                    <Button variant="outline" className="flex-1 border-gray-200 hover:bg-gray-50">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardContent>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between p-6 border-t">
        <Button variant="ghost" size="icon" onClick={scrollPrev} className="hover:bg-gray-50">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex gap-1">
          {schemes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                emblaApi?.scrollTo(index)
                setCurrentIndex(index)
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-blue-500" : "w-1.5 bg-gray-200"
              }`}
            />
          ))}
        </div>
        <Button variant="ghost" size="icon" onClick={scrollNext} className="hover:bg-gray-50">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}

