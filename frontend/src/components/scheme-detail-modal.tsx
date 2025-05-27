"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface SchemeDetailModalProps {
  scheme: {
    id: string
    title: string
    ministry: string
    description: string
    location: string
    tags: string[]
    details: string
    benefits: {
      amount: string
      disbursal: string[]
      note?: string
    }
    eligibility: string[]
    applicationProcess: {
      steps: Array<{
        title: string
        description: string
      }>
    }
    documents: string[]
    faq: Array<{
      question: string
      answer: string
    }>
    sources: string[]
  }
  onClose: () => void
}

const sections = [
  { id: "details", title: "Details" },
  { id: "benefits", title: "Benefits" },
  { id: "eligibility", title: "Eligibility" },
  { id: "application", title: "Application Process" },
  { id: "documents", title: "Documents Required" },
  { id: "faq", title: "Frequently Asked Questions" },
  { id: "sources", title: "Sources And References" },
]

export function SchemeDetailModal({ scheme, onClose }: SchemeDetailModalProps) {
  const [activeSection, setActiveSection] = useState("details")
  const observerRefs = useRef<IntersectionObserver[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const options = {
      root: contentRef.current,
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    }

    sections.forEach((section) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id)
          }
        })
      }, options)

      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
        observerRefs.current.push(observer)
      }
    })

    return () => {
      observerRefs.current.forEach((observer) => observer.disconnect())
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={onClose} className="flex items-center text-sm text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Scheme Detail
          </button>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-64 border-r p-4">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={cn(
                    "w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <ScrollArea className="flex-1" ref={contentRef}>
            <div className="p-6 space-y-8">
              <div>
                <div className="text-sm text-gray-600 mb-1">{scheme.location}</div>
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{scheme.title}</h1>
                <div className="flex flex-wrap gap-2 mb-6">
                  {scheme.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Check Eligibility</Button>
              </div>

              <section id="details" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
                <p className="text-gray-600 leading-relaxed">{scheme.details}</p>
              </section>

              <section id="benefits" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">{scheme.benefits.amount}</p>
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Disbursal</h3>
                    <ul className="space-y-3 text-gray-600">
                      {scheme.benefits.disbursal.map((item, index) => (
                        <li key={index} className="flex gap-3">
                          <span className="flex-shrink-0">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {scheme.benefits.note && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 italic">
                      {scheme.benefits.note}
                    </div>
                  )}
                </div>
              </section>

              <section id="eligibility" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Eligibility</h2>
                <ul className="space-y-3 text-gray-600">
                  {scheme.eligibility.map((item, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="application" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Process</h2>
                <div className="space-y-4">
                  {scheme.applicationProcess.steps.map((step, index) => (
                    <div key={index} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="documents" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents Required</h2>
                <ul className="space-y-3 text-gray-600">
                  {scheme.documents.map((doc, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0">•</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </section>

              <section id="faq" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {scheme.faq.map((item, index) => (
                    <div key={index}>
                      <h3 className="font-medium text-gray-900 mb-2">Q: {item.question}</h3>
                      <p className="text-gray-600">A: {item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="sources" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Sources And References</h2>
                <ul className="space-y-3 text-gray-600">
                  {scheme.sources.map((source, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="flex-shrink-0">•</span>
                      {source}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

