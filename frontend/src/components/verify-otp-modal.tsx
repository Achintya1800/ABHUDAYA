"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface VerifyOTPModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VerifyOTPModal({ isOpen, onClose }: VerifyOTPModalProps) {
  const [otp, setOtp] = useState("")
  const [timeLeft, setTimeLeft] = useState(120)

  useEffect(() => {
    if (!isOpen) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] p-6">
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-semibold text-[#1A1A1A]">Mobile Number Verification</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-[#F8F9FC]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6 pt-2">
          <div className="space-y-4">
            <p className="text-[15px] text-[#666666]">Now enter the OTP that has been sent to your Mobile number.</p>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1A1A1A]">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="h-[46px] w-full rounded-lg border border-[#E5E7EB] px-4 text-[15px] text-[#1A1A1A] outline-none transition-colors placeholder:text-[#A0A0A0] focus:border-[#0066B3]"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[15px] text-[#0066B3]">{timeLeft} Seconds</p>
            <div className="h-1 w-full overflow-hidden rounded-full bg-[#F8F9FC]">
              <div
                className="h-full bg-[#0066B3] transition-all duration-1000"
                style={{ width: `${(timeLeft / 120) * 100}%` }}
              />
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="h-[46px] w-full rounded-lg border border-[#E5E7EB] bg-white text-[15px] font-medium text-[#1A1A1A] transition-colors hover:bg-[#F8F9FC]"
            >
              Cancel
            </button>
            <button
              disabled={!otp}
              className="h-[46px] w-full rounded-lg bg-[#F8F9FC] text-[15px] font-medium text-[#1A1A1A] transition-colors enabled:bg-[#0066B3] enabled:text-white enabled:hover:bg-[#0066B3]/90 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

