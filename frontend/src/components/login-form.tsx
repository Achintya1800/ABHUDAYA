"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Info } from "lucide-react"
import { SuccessModal } from "./success-modal"
import { VerifyOTPForm } from "./verify-otp-form"

export function LoginForm() {
  const router = useRouter()
  const [mobileNumber, setMobileNumber] = useState("")
  const [mpin, setMpin] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [showOTPVerification, setShowOTPVerification] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate credentials
    // For now, we'll just redirect to home
    router.push("/")
  }

  const handleOTPLogin = () => {
    setShowSuccessModal(true)
  }

  const handleCloseModal = () => {
    setShowSuccessModal(false)
    setShowOTPVerification(true)
  }

  const handleVerifyOTP = () => {
    // Here you would typically verify the OTP
    // For now, we'll just redirect to home
    router.push("/")
  }

  if (showOTPVerification) {
    return (
      <VerifyOTPForm
        mobileNumber={mobileNumber}
        onEdit={() => setShowOTPVerification(false)}
        onVerify={handleVerifyOTP}
      />
    )
  }

  return (
    <>
      <div className="w-full max-w-[440px] space-y-5 rounded-2xl bg-white p-7 shadow-[0_2px_4px_0_rgba(0,0,0,0.05),0_1px_6px_-1px_rgba(0,0,0,0.02),0_1px_4px_-1px_rgba(0,0,0,0.02)]">
        <div className="space-y-1">
          <h1 className="text-[22px] font-semibold text-[#1A1A1A]">Login</h1>
          <p className="text-[15px] text-[#666666]">Welcome back to your ABHUDAYA account!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1A1A1A]">Mobile Number</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter Your Mobile Number"
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-[15px] text-[#1A1A1A] outline-none transition-colors placeholder:text-[#A0A0A0] focus:border-[#0066B3] focus:ring-1 focus:ring-[#0066B3]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[#1A1A1A]">Enter MPIN</label>
            <input
              type="password"
              value={mpin}
              onChange={(e) => setMpin(e.target.value)}
              placeholder="Enter your MPIN"
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-[15px] text-[#1A1A1A] outline-none transition-colors placeholder:text-[#A0A0A0] focus:border-[#0066B3] focus:ring-1 focus:ring-[#0066B3]"
            />
            <div className="flex justify-end">
              <Link href="/forgot-mpin" className="text-sm text-[#0066B3] hover:underline">
                Forgot MPIN?
              </Link>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="h-[46px] w-full rounded-lg bg-[#0066B3] text-[15px] font-medium text-white transition-colors hover:bg-[#0066B3]/90 active:bg-[#005092]"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleOTPLogin}
              className="h-[46px] w-full rounded-lg bg-[#F8F9FC] text-[15px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#F8F9FC]/80 active:bg-[#E5E7EB]"
            >
              Login with OTP
            </button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="text-center text-[15px]">
            <span className="text-[#666666]">New on ABHUDAYA? </span>
            <Link href="/register" className="text-[#0066B3] hover:underline">
              Register Here
            </Link>
          </div>

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
            className="h-[46px] w-full rounded-lg bg-[#F8F9FC] text-[15px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#F8F9FC]/80 active:bg-[#E5E7EB]"
          >
            <div className="flex items-center justify-center gap-2">
              <Info className="h-4 w-4 text-[#0066B3]" />
              MeriPehchaan
            </div>
          </button>

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

