"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { SuccessModal } from "./success-modal"
import { MobileVerification } from "./mobile-verification"

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

export function SignUpForm() {
  const [mobileNumber, setMobileNumber] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [isAgreed, setIsAgreed] = useState(false)
  const [showStateDropdown, setShowStateDropdown] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showVerification, setShowVerification] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccessModal(true)
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
    setShowVerification(true)
  }

  if (showVerification) {
    return <MobileVerification mobileNumber={mobileNumber} onEdit={() => setShowVerification(false)} />
  }

  return (
    <>
      <div className="w-full max-w-[440px] space-y-6 rounded-2xl bg-white p-7 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
        <div className="space-y-2">
          <h1 className="text-[22px] font-semibold text-[#1A1A1A]">Sign Up</h1>
          <div className="space-y-1">
            <p className="text-[15px] text-[#1A1A1A]"> Let's start by verifying your 10 digit mobile number.</p>
            <p className="text-[15px] text-[#666666]">We will send you an OTP on this number for verification</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1A1A1A]">Mobile Number</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter Your Mobile Number"
              maxLength={10}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] px-4 text-[15px] text-[#1A1A1A] outline-none transition-colors placeholder:text-[#A0A0A0] focus:border-[#0066B3]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1A1A1A]">State</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowStateDropdown(!showStateDropdown)}
                className="flex h-[46px] w-full items-center justify-between rounded-lg border border-[#E5E7EB] bg-white px-4 text-[15px] text-[#A0A0A0] outline-none transition-colors focus:border-[#0066B3]"
              >
                {selectedState || "Select your state"}
                <ChevronDown className="h-4 w-4 text-[#666666]" />
              </button>
              {showStateDropdown && (
                <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                  {states.map((state) => (
                    <button
                      key={state}
                      type="button"
                      onClick={() => {
                        setSelectedState(state)
                        setShowStateDropdown(false)
                      }}
                      className="w-full px-4 py-2 text-left text-[15px] text-[#1A1A1A] hover:bg-[#F8F9FC]"
                    >
                      {state}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <p className="text-[15px] text-[#666666]">Remember, this mobile number will be used for log in</p>

          <label className="flex items-start gap-2">
            <input
              type="checkbox"
              checked={isAgreed}
              onChange={(e) => setIsAgreed(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[#E5E7EB] text-[#0066B3]"
            />
            <span className="text-[15px] text-[#1A1A1A]">
              I agree to the terms and conditions of the{" "}
              <Link href="/eula" className="text-[#0066B3] hover:underline">
                End-user license agreement
              </Link>
              (EULA)
            </span>
          </label>

          <button
            type="submit"
            disabled={!mobileNumber || !selectedState || !isAgreed}
            className="h-[46px] w-full rounded-lg text-[15px] font-medium transition-colors disabled:bg-[#F8F9FC] disabled:text-[#1A1A1A] disabled:opacity-50 enabled:bg-[#0066B3] enabled:text-white enabled:hover:bg-[#0066B3]/90"
          >
            Register
          </button>
        </form>

        <div className="text-center text-[15px]">
          <span className="text-[#666666]">Already have an account? </span>
          <Link href="/" className="text-[#0066B3] hover:underline">
            Login here
          </Link>
        </div>
      </div>

      <SuccessModal isOpen={showSuccessModal} onClose={handleCloseModal} />
    </>
  )
}

