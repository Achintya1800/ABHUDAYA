"use client"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[400px] rounded-lg p-6">
        <div className="space-y-6">
          <p className="text-center text-[15px] text-[#1A1A1A]">
            An OTP has been generated and sent to your mobile number successfully.
          </p>
          <button
            onClick={onClose}
            className="h-[46px] w-full rounded-lg bg-[#0066B3] text-[15px] font-medium text-white transition-colors hover:bg-[#0066B3]/90"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

