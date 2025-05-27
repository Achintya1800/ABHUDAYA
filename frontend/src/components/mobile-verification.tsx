"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"

interface MobileVerificationProps {
  mobileNumber: string
  onEdit: () => void
}

export function MobileVerification({ mobileNumber, onEdit }: MobileVerificationProps) {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""))
  const [timeLeft, setTimeLeft] = useState(120)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="w-full max-w-[440px] space-y-6 rounded-2xl bg-white p-7 shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
      <div className="space-y-2">
        <h1 className="text-[22px] font-semibold text-[#1A1A1A]">Mobile Number Verification</h1>
        <p className="text-[15px] text-[#666666]">
          UMANG has sent you an OTP on your registered mobile {mobileNumber}{" "}
          <button onClick={onEdit} className="text-[#0066B3] hover:underline">
            (Edit)
          </button>
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 rounded-md border border-[#E5E7EB] text-center text-lg text-[#1A1A1A] outline-none transition-colors focus:border-[#0066B3]"
            />
          ))}
        </div>

        <button
          type="button"
          className="h-[46px] w-full rounded-lg bg-[#F8F9FC] text-[15px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#F8F9FC]/80"
        >
          Verify OTP
        </button>
      </div>

      <div className="space-y-1">
        <p className="text-[15px] text-[#666666]">Wait few minutes for the OTP, do not refresh or close!</p>
        <p className="text-right text-[15px] text-[#0066B3]">{timeLeft} Seconds</p>
      </div>
    </div>
  )
}

