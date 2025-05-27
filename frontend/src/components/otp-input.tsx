"use client"

import { useEffect, useRef, useState } from "react"
import { Input } from "@/components/ui/input"

interface OTPInputProps {
  length: number
  onComplete: (otp: string) => void
}

export function OTPInput({ length, onComplete }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
  const [timeLeft, setTimeLeft] = useState(120)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (!timeLeft) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft])

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    const otpString = newOtp.join("")
    if (otpString.length === length) {
      onComplete(otpString)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-center gap-2">
        {otp.map((value, index) => (
          <Input
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            type="text"
            inputMode="numeric"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="h-12 w-12 text-center text-lg"
            maxLength={1}
          />
        ))}
      </div>
      <div className="text-center text-sm text-muted-foreground">
        {timeLeft > 0 ? (
          <span>{timeLeft} Seconds</span>
        ) : (
          <button className="text-primary hover:underline">Resend OTP</button>
        )}
      </div>
    </div>
  )
}

