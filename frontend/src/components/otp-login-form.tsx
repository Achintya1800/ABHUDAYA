"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Info } from "lucide-react"
import { SuccessModal } from "./success-modal"
import { VerifyOTPForm } from "./verify-otp-form"

interface OTPLoginFormProps {
  onSwitchToMPIN: () => void
}

export function OTPLoginForm({ onSwitchToMPIN }: OTPLoginFormProps) {
  const [mobileNumber, setMobileNumber] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showVerifyOTP, setShowVerifyOTP] = useState(false)

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault()
    setShowSuccessModal(true)
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
    setShowVerifyOTP(true)
  }

  if (showVerifyOTP) {
    return <VerifyOTPForm mobileNumber={mobileNumber} onEdit={() => setShowVerifyOTP(false)} />
  }

  return (
    <>
      <div className="w-full max-w-[440px] space-y-5 rounded-2xl bg-white p-7 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-[22px] font-semibold text-[#1A1A1A]">Login</h1>
          <p className="text-[15px] text-[#666666]">Welcome back to your UMANG account!</p>
        </div>

        <form onSubmit={handleSendOTP} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1A1A1A]">Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter Your Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] px-4 text-[15px] text-[#1A1A1A] outline-none transition-colors placeholder:text-[#A0A0A0] focus:border-[#0066B3]"
            />
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="h-[46px] w-full rounded-lg bg-[#0066B3] text-[15px] font-medium text-white transition-colors hover:bg-[#0066B3]/90"
            >
              Send OTP
            </button>

            <button
              type="button"
              onClick={onSwitchToMPIN}
              className="h-[46px] w-full rounded-lg bg-[#F8F9FC] text-[15px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#F8F9FC]/80"
            >
              Login with MPIN
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#E5E7EB]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-[#666666]">or Login/Register with</span>
            </div>
          </div>

          <button
            type="button"
            className="flex h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-[#F8F9FC] text-[15px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#F8F9FC]/80"
          >
            <Info className="h-4 w-4 text-[#0066B3]" />
            MeriPehchaan
          </button>

          <div className="text-center text-sm">
            <span className="text-[#666666]">New on UMANG? </span>
            <Link href="/register" className="text-[#0066B3] hover:underline">
              Register Here
            </Link>
          </div>

          <div className="flex items-start gap-2.5 rounded-lg bg-[#F8F9FC] p-4 text-[13px]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#0066B3]" />
            <div className="space-y-0.5 text-[#666666]">
              <span className="font-medium text-[#1A1A1A]">MeriPehchaan</span>
              <span>
                {" "}
                - National Single Sign-On-One citizen login for accessing multiple public services from various
                departments
              </span>
            </div>
          </div>
        </div>
      </div>

      <SuccessModal isOpen={showSuccessModal} onClose={handleCloseModal} />
    </>
  )
}

