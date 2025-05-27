"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Section {
  id: string
  title: string
}

const sections: Section[] = [
  { id: "details", title: "Details" },
  { id: "benefits", title: "Benefits" },
  { id: "eligibility", title: "Eligibility" },
  { id: "application", title: "Application Process" },
  { id: "documents", title: "Documents Required" },
  { id: "faq", title: "Frequently Asked Questions" },
  { id: "sources", title: "Sources And References" },
]

export default function SchemeDetailPage() {
  const [activeSection, setActiveSection] = useState("details")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/schemes" className="flex items-center text-sm text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Scheme Detail
              </Link>
            </div>
            <Button variant="ghost" size="icon">
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={cn(
                      "w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg",
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
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="mb-6">
              <div className="text-sm text-gray-600 mb-1">Puducherry</div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                "Immediate Relief Assistance" under "Welfare and Relief for Fishermen During Lean Seasons and Natural
                Calamities Scheme"
              </h1>
              <div className="flex flex-wrap gap-2">
                {["Missing", "Fisherman", "Relief", "Financial Assistance", "Family"].map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <Button className="mb-8 bg-blue-600 hover:bg-blue-700">Check Eligibility</Button>

            <div className="space-y-8">
              {/* Details Section */}
              <section id="details" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Details</h2>
                <p className="text-gray-600 leading-relaxed">
                  The scheme "Immediate Relief Assistance" is a Sub-Component under the scheme "Welfare and Relief for
                  Fishermen During Lean Seasons and Natural Calamities Scheme". The scheme is extended to all the
                  regions of the Union territory of Puducherry. The scheme is introduced with the objective of extending
                  financial assistance to the fishermen's families to compensate for the loss due to the missing
                  breadwinner and to support them financially to run their family.
                </p>
              </section>

              {/* Benefits Section */}
              <section id="benefits" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Benefits</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    ₹ 1,00,000, in two installments of ₹ 50,000 each, as immediate relief assistance for the family
                    (legal heir) of the missing fisherman.
                  </p>
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Disbursal</h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0">•</span>
                        Initially, 50% will be extended within 3 months from the date of receipt of the application from
                        the family (legal heir).
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0">•</span>
                        The family (legal heir) should approach this department for the release of the balance 50% of
                        the relief which will be deposited in the bank in a joint account in the name of kin (legal
                        heir) and the competent authority concerned.
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0">•</span>
                        If no further information is received about the missing person, the balance amount will be
                        released in favour of the next of kin (legal heir), after the prescribed period of 9 months from
                        the date of release of 1st part of lump sum.
                      </li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800 italic">
                    *In case of the return of the missing fishermen, the amount extended as compensation either ₹ 50,000
                    or ₹ 1,00,000 as the case may be, will be recovered by invoking an insurance bond.
                  </div>
                </div>
              </section>

              {/* Eligibility Section */}
              <section id="eligibility" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Eligibility</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    The fisherman must be registered with the Fisheries Department
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    Must be a resident of Puducherry
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    The family must file a missing person report with the local police station
                  </li>
                </ul>
              </section>

              {/* Application Process Section */}
              <section id="application" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Process</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">File Missing Person Report</h3>
                      <p className="text-gray-600">
                        File a missing person report at the local police station and obtain a copy of the FIR
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Submit Application</h3>
                      <p className="text-gray-600">
                        Submit the application form along with required documents to the Fisheries Department
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Verification</h3>
                      <p className="text-gray-600">
                        The department will verify the documents and process the application
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Disbursal</h3>
                      <p className="text-gray-600">First installment will be released within 3 months of application</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Documents Required Section */}
              <section id="documents" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Documents Required</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    Copy of the FIR filed at the police station
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    Proof of registration with Fisheries Department
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    Residence proof of Puducherry
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    Identity proof of the legal heir
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    Bank account details
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    Two passport size photographs
                  </li>
                </ul>
              </section>

              {/* FAQ Section */}
              <section id="faq" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">
                      Q: How long does it take to receive the first installment?
                    </h3>
                    <p className="text-gray-600">
                      A: The first installment (50% of the total amount) will be released within 3 months from the date
                      of application submission.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Q: When can I apply for the second installment?</h3>
                    <p className="text-gray-600">
                      A: The family can approach the department for the second installment after 9 months from the date
                      of release of the first installment.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Q: What happens if the missing person returns?</h3>
                    <p className="text-gray-600">
                      A: If the missing fisherman returns, the compensation amount will be recovered through an
                      insurance bond.
                    </p>
                  </div>
                </div>
              </section>

              {/* Sources Section */}
              <section id="sources" className="scroll-mt-20">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Sources And References</h2>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    Fisheries Department, Government of Puducherry
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    Welfare and Relief for Fishermen Scheme Guidelines
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0">•</span>
                    Government Order No. 123/2023
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

