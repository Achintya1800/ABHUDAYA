"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, Bookmark, X } from "lucide-react"
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

// Replace the existing defaultScheme with this updated version
const defaultScheme = {
  id: "affdf-001",
  title:
    "AFFDF-Financial Assistance For Treatment Of Serious Diseases To Non Pensioner Ex-Servicemen (All Ranks)/Widows",
  ministry: "Ministry Of Defence",
  description: "Financial assistance for treatment of serious diseases",
  location: "India",
  tags: ["Ex-Servicemen", "Widow Of Ex-Servicemen", "Serious Disease Treatment"],
  details: `A scheme to provide financial assistance to a non-pensioner Ex-Servicemen of all ranks and widows to meet medical expenses related to treatment of approved serious diseases like cancer, renal failure, knee replacement and heart surgery.

Expenditure must be incurred at a approved govt hospital at the rates applicable under CGHS / ECHS.

List of the serious diseases are covered under this scheme:

• Angiography & Angioplasty
• CABG. (l) Dialysis
• Open heart surgery
• Valve replacement
• Pacemaker Implant
• Cerebral stroke
• Prostrate surgery
• Joint replacement
• Renal failure
• Cancer

Treatment of other Diseases:
In case the treatment of a serious disease which is not listed, such application will be referred to Director General Armed Forces Medical Services (DGAFMS) for comment/recommendation to consider it for financial assistance for treatment of that disease, to ESM under this scheme.`,
  benefits: {
    amount: `Financial assistance for treatment of the approved serious diseases to non-pensioner Ex-Servicemen of all ranks and widows subject to a maximum of Rs 1,25,000/- (One Time) and for treatment of cancer/dialysis subject to a maximum of Rs 75,000/- per annum as follows:
    
• For Non-Pensioner Officers/Widows: 75% of total expenditure incurred on medical treatment, hospitalization, medicines etc.
• For Non-Pensioner other Ranks/Widows: 90% of total expenditure incurred per annum on medical treatment, hospitalization, medicine etc.`,
    disbursal: [
      "Maximum of Rs 1,25,000/- (One Time) for approved serious diseases",
      "Maximum of Rs 75,000/- per annum for cancer/dialysis treatment",
      "75% of total expenditure for Non-Pensioner Officers/Widows",
      "90% of total expenditure for Non-Pensioner other Ranks/Widows",
    ],
    note: "Expenditure must be incurred at a approved govt hospital at the rates applicable under CGHS / ECHS.",
  },
  eligibility: [
    "Applicant must be a non-pensioner ESM or his widow.",
    "Should not be member of ECHS or availing AFMS facilities.",
    "Should be recommended by respective Zila Sainik Board (ZSB).",
    "Expenditure must be incurred at a approved govt hospital at the rates applicable under CGHS / ECHS.",
  ],
  applicationProcess: {
    steps: [
      {
        title: "Online Application",
        description: `
1. Visit the official website of Kendriya Sainik Board Secretariat (KSBS) https://ksb.gov.in/
2. Click on "Register" on the homepage.
3. Fill the registration form with necessary details.
4. Upload the Photo.
5. Save the application and activate your account via email.
6. Login to the KSB portal.
7. Select the scheme name and fill the new application form.
8. Upload supporting documents attested by the Zila Sainik Welfare Officer (ZSWO).
9. Submit the online application.
10. ZSWO will scrutinize and verify the application.
11. ZWSO will recommend and forward the application to Kendriya Sainik Board (KSB) through Rajya Sainik Boards (RSBs).`,
      },
      {
        title: "Processing at KSB Secretariat",
        description:
          "Once the application reaches the Kendriya Sainik Board, the Section-in-charge verifies it and uploads the printed list for the approval of JD (Welfare).",
      },
      {
        title: "Payment Procedure",
        description: `
1. After approval of Secretary KSB, the application is processed for payment by Welfare Section.
2. The welfare section verifies the Ex-servicemen's details and forwards the list to Accounts Section.
3. The Accounts Section processes the payment directly to beneficiaries via ECS.`,
      },
      {
        title: "Track Application Status",
        description: `
1. Revisit https://ksb.gov.in/index.htm
2. Click on "Status of application" link on the homepage.
3. Enter your DAK ID and verification code.
4. Click on the "Search" button.`,
      },
    ],
  },
  documents: [
    "Complete Service Discharge Book/Documents.",
    "Photocopy of ESM / widow I Card.",
    "Original medical bills duly countersigned by attending doctor.",
    "Hospital admission and discharge report duly countersigned by hospital authority.",
    "A certificate from applicant that he/she has not taken any money/grant from the State Govt or present employer in the form of reimbursement or medical allowance.",
    "Details of Bank A/c No (in PNB/SBI only) and IFS Code.",
  ],
  faq: [
    {
      question: "Can I Take The Benefit Of This Scheme For Treatment In Any Private Or Government Hospital?",
      answer:
        "No, the expenditure must be incurred at an approved government hospital at the rates applicable under CGHS / ECHS.",
    },
    {
      question: "Can I Give Bank Details Of Any Bank?",
      answer:
        "No, you need to provide bank account details of either Punjab National Bank (PNB) or State Bank of India (SBI) only.",
    },
  ],
  sources: ["Scheme Guidelines", "Kendriya Sainik Board Secretariat (KSBS) official website"],
}

const sections = [
  { id: "details", title: "Details" },
  { id: "benefits", title: "Benefits" },
  { id: "eligibility", title: "Eligibility" },
  { id: "application", title: "Application Process" },
  { id: "documents", title: "Documents Required" },
  { id: "faq", title: "FAQ" },
  { id: "sources", title: "Sources And References" },
]

export function SchemeDetailModal({ scheme = defaultScheme, onClose }: SchemeDetailModalProps) {
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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center">
        <div className="w-full max-w-7xl h-[90vh] flex flex-col bg-white border border-gray-200 rounded-lg shadow-lg sm:h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
            <button
              onClick={onClose}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Scheme Detail
            </button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="text-blue-600 border-gray-300 hover:bg-gray-100">
                <Bookmark className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="hidden md:block w-64 border-r border-gray-200 bg-gray-50">
              <nav className="p-4 space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={cn(
                      "w-full flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors",
                      activeSection === section.id
                        ? "bg-gray-200 text-gray-900"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                    )}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <ScrollArea className="flex-1" ref={contentRef}>
              <div className="px-6 py-6 space-y-10">
                <div>
                  <div className="text-sm text-gray-600 mb-2">{scheme?.ministry || "Ministry"}</div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-4">{scheme?.title || "Scheme Title"}</h1>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {scheme?.tags?.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                        {tag}
                      </Badge>
                    )) || null}
                  </div>
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                    Check Eligibility
                  </Button>
                </div>

                <section id="details" className="scroll-mt-20">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
                  <div className="prose max-w-none">
                    {scheme?.details?.split("\n").map((paragraph, index) => (
                      <p key={index} className="text-gray-700">
                        {paragraph}
                      </p>
                    )) || <p className="text-gray-700">No details available</p>}
                  </div>
                </section>

                <section id="benefits" className="scroll-mt-20">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
                  <div className="space-y-4">
                    <div className="prose max-w-none">
                      {scheme?.benefits?.amount?.split("\n").map((paragraph, index) => (
                        <p key={index} className="text-gray-700">
                          {paragraph}
                        </p>
                      )) || <p className="text-gray-700">Amount details not available</p>}
                    </div>
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Disbursal</h3>
                      <ul className="space-y-3 text-gray-600">
                        {scheme?.benefits?.disbursal?.map((item, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="flex-shrink-0">•</span>
                            {item}
                          </li>
                        )) || <li>No disbursal information available</li>}
                      </ul>
                    </div>
                    {scheme?.benefits?.note && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 italic">
                        {scheme.benefits.note}
                      </div>
                    )}
                  </div>
                </section>

                <section id="eligibility" className="scroll-mt-20">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Eligibility</h2>
                  <ul className="space-y-3 text-gray-600">
                    {scheme?.eligibility?.map((item, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0">•</span>
                        {item}
                      </li>
                    )) || <li>No eligibility information available</li>}
                  </ul>
                </section>

                <section id="application" className="scroll-mt-20">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Process</h2>
                  <div className="space-y-6">
                    {scheme?.applicationProcess?.steps?.map((step, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center flex-shrink-0 font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900 mb-1">{step.title}</h3>
                          <div className="text-gray-600">
                            {step.description.split("\n").map((line, i) => (
                              <p key={i}>{line}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    )) || <p className="text-gray-600">No application process information available</p>}
                  </div>
                </section>

                <section id="documents" className="scroll-mt-20">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents Required</h2>
                  <ul className="space-y-3 text-gray-600">
                    {scheme?.documents?.map((doc, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0">•</span>
                        {doc}
                      </li>
                    )) || <li>No document information available</li>}
                  </ul>
                </section>

                <section id="faq" className="scroll-mt-20">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-6">
                    {scheme?.faq?.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-medium text-gray-900">Q: {item.question}</h3>
                        <p className="text-gray-600">A: {item.answer}</p>
                      </div>
                    )) || <p className="text-gray-600">No FAQ information available</p>}
                  </div>
                </section>

                <section id="sources" className="scroll-mt-20">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Sources And References</h2>
                  <ul className="space-y-3 text-gray-600">
                    {scheme?.sources?.map((source, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="flex-shrink-0">•</span>
                        {source}
                      </li>
                    )) || <li>No source information available</li>}
                  </ul>
                </section>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SchemeDetailModal