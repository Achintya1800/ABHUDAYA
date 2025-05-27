"use client"
import Link from "next/link"
import { Phone } from "lucide-react"

export function ForgotMPINForm() {
  return (
    <div className="w-full max-w-[440px] space-y-5 rounded-2xl bg-white p-7 shadow-[0_2px_4px_0_rgba(0,0,0,0.05),0_1px_6px_-1px_rgba(0,0,0,0.02),0_1px_4px_-1px_rgba(0,0,0,0.02)]">
      <div className="space-y-2">
        <h1 className="text-[22px] font-semibold text-[#1A1A1A]">Forgot MPIN?</h1>
        <p className="text-[15px] text-[#666666]">Enter your UMANG registered mobile number.</p>
      </div>

      <form className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-[#1A1A1A]">Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter Your Mobile Number"
            className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-white px-4 text-[15px] text-[#1A1A1A] outline-none transition-colors placeholder:text-[#A0A0A0] focus:border-[#0066B3] focus:ring-1 focus:ring-[#0066B3]"
          />
        </div>

        <button
          type="submit"
          className="h-[46px] w-full rounded-lg bg-[#0066B3] text-[15px] font-medium text-white transition-colors hover:bg-[#0066B3]/90"
        >
          Next
        </button>
      </form>

      <div className="space-y-4">
        <div className="text-center text-[15px]">
          <span className="text-[#666666]">Already have an account? </span>
          <Link href="/" className="text-[#0066B3] hover:underline">
            Login here
          </Link>
        </div>

        <div className="space-y-2">
          <p className="text-[15px] text-[#666666]">Don't have access to the UMANG registered mobile number?</p>
          <button className="flex items-center gap-2 text-[15px] text-[#0066B3] hover:underline">
            <Phone className="h-4 w-4" />
            Contact Customer Care
          </button>
        </div>
      </div>
    </div>
  )
}

