"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const router = useRouter()
  const [step, setStep] = useState<"login" | "otp" | "consent">("login")
  const [mobile, setMobile] = useState("")
  const [pin, setPin] = useState("")
  const [otp, setOtp] = useState("")
  const [pinless, setPinless] = useState(false)
  const [purpose, setPurpose] = useState("")
  const [consentItems, setConsentItems] = useState({
    docs: true,
    drive: true,
    profile: true,
  })

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("otp")
  }

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("consent")
  }

  const handleConsent = (allow: boolean) => {
    if (allow) {
      if (Object.values(consentItems).some((item) => item) && purpose) {
        router.push("/dashboard")
      } else {
        // Show an error message or prevent submission
        alert("Please select at least one consent item and a purpose")
      }
    } else {
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1400px] w-full">
        {step === "login" && (
          <div className="space-y-4">
            <div className="flex justify-center">
              
            </div>
            <h2 className="text-center text-lg font-medium">Sign In to your account via DigiLocker</h2>
            <Tabs defaultValue="mobile" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="mobile">Mobile</TabsTrigger>
                <TabsTrigger value="username">Username</TabsTrigger>
                <TabsTrigger value="others">Others</TabsTrigger>
              </TabsList>
              <TabsContent value="mobile" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Input
                      type="tel"
                      placeholder="Mobile*"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                    />
                    <Input
                      type="password"
                      placeholder="PIN*"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="pinless"
                      checked={pinless}
                      onCheckedChange={(checked) => setPinless(checked as boolean)}
                    />
                    <label htmlFor="pinless" className="text-sm">
                      PIN less authentication
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="text-sm">
                      I consent to{" "}
                      <a href="#" className="text-blue-600">
                        terms of use
                      </a>
                    </label>
                  </div>
                  <Button type="submit" className="w-full bg-[#40B759] hover:bg-[#359A4B]">
                    Sign In
                  </Button>
                  <div className="text-center text-sm">
                    New user?{" "}
                    <a href="#" className="text-blue-600">
                      Sign up
                    </a>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {step === "otp" && (
          <div className="space-y-4">
            <div className="flex justify-center">
             
            </div>
            <h2 className="text-center text-lg font-medium">Verify OTP</h2>
            <div className="bg-green-50 p-4 rounded-md text-sm">
              DigiLocker has sent you an OTP to your registered mobile.
              <br />
              OTP will be valid for 10 Minutes.
            </div>
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <Input
                type="text"
                placeholder="Enter OTP*"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-[#40B759] hover:bg-[#359A4B]">
                Sign In
              </Button>
              <div className="text-center text-sm">
                <button type="button" className="text-blue-600">
                  Resend OTP in 00:58
                </button>
              </div>
            </form>
          </div>
        )}

        {step === "consent" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              
              
            </div>
            <div className="space-y-4">
              <p>Please provide your consent to share the following with UMANG:</p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="docs"
                    checked={consentItems.docs}
                    onCheckedChange={(checked) => setConsentItems((prev) => ({ ...prev, docs: checked === true }))}
                  />
                  <label htmlFor="docs">Issued Documents</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="drive"
                    checked={consentItems.drive}
                    onCheckedChange={(checked) => setConsentItems((prev) => ({ ...prev, drive: checked === true }))}
                  />
                  <label htmlFor="drive">DigiLocker Drive</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="profile"
                    checked={consentItems.profile}
                    onCheckedChange={(checked) => setConsentItems((prev) => ({ ...prev, profile: checked === true }))}
                  />
                  <label htmlFor="profile">
                    Profile Information
                    <div className="text-sm text-gray-500">Name, Date of Birth, Gender</div>
                  </label>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm">Purpose</label>
                <Select value={purpose} onValueChange={setPurpose}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kyc">Know Your Customer</SelectItem>
                    <SelectItem value="verification">Verification</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="services">Availing Services</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="age">Age verification</SelectItem>
                    <SelectItem value="guardian">Guardian consent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  Consent validity date (Today + 30 days)
                  <div className="text-gray-500">09 March 2024</div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Consent validity is subject to applicable laws.</p>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => handleConsent(false)}>
                      Deny
                    </Button>
                    <Button
                      onClick={() => handleConsent(true)}
                      disabled={!purpose || !Object.values(consentItems).some((item) => item)}
                    >
                      Allow
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

