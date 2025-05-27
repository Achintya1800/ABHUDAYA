"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Playfair_Display } from "next/font/google"

const playfair = Playfair_Display({ subsets: ["latin"] })

const slides = [
  {
    title: "Discover Government Schemes Tailored for You",
    description: "Explore relevant schemes based on your region, age, and gender, all at your fingertips.",
    bgColor: "bg-blue-900",
    emoji: "🔍",
  },
  {
    title: "Financial Assistance for Education",
    description: "Find scholarships and grants to support your academic journey.",
    bgColor: "bg-green-900",
    emoji: "🎓",
  },
  {
    title: "Support for Small Businesses",
    description: "Access loans, subsidies, and resources to grow your enterprise.",
    bgColor: "bg-purple-900",
    emoji: "💼",
  },
  {
    title: "Healthcare Initiatives in Maharashtra",
    description: "Explore health schemes and medical support programs in Maharashtra.",
    bgColor: "bg-red-900",
    emoji: "🏥",
  },
  {
    title: "Agricultural Subsidies in Punjab",
    description: "Discover farming support and rural development schemes in Punjab.",
    bgColor: "bg-yellow-800",
    emoji: "🌾",
  },
  {
    title: "Technology Grants by Ministry of Electronics & IT",
    description: "Innovate and grow with tech-focused schemes and digital initiatives.",
    bgColor: "bg-indigo-900",
    emoji: "💻",
  },
  {
    title: "Women Empowerment Programs in Tamil Nadu",
    description: "Explore schemes supporting women's education, employment, and entrepreneurship.",
    bgColor: "bg-pink-800",
    emoji: "👩‍🦰",
  },
  {
    title: "Skill Development Initiatives by Ministry of Skill Development",
    description: "Enhance your skills and improve employability with vocational training programs.",
    bgColor: "bg-teal-800",
    emoji: "🛠️",
  },
  {
    title: "Clean Energy Projects in Gujarat",
    description: "Participate in renewable energy schemes and green initiatives.",
    bgColor: "bg-green-800",
    emoji: "🌿",
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative mb-12 overflow-hidden shadow-sm">
      <div className="relative h-[300px] sm:h-[400px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-2000 ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            } ${slide.bgColor}`}
          >
            <div className="relative z-10 max-w-3xl mx-auto text-center px-6 sm:px-12">
              <div className="text-6xl mb-4">{slide.emoji}</div>
              <h1 className={`mb-4 text-4xl sm:text-5xl font-bold leading-tight text-white ${playfair.className}`}>
                {slide.title}
              </h1>
              <p className={`text-xl sm:text-2xl text-gray-200 ${playfair.className}`}>{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full text-white hover:bg-white/50 transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 p-2 rounded-full text-white hover:bg-white/50 transition-colors"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  )
}

