"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface LocationPermissionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

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

const cities = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
  Delhi: ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  // Add more cities for other states
}

export function LocationPermissionDialog({ open, onOpenChange }: LocationPermissionDialogProps) {
  const router = useRouter()
  const [state, setState] = useState<string>("")
  const [city, setCity] = useState<string>("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!state || !city) return

    setLoading(true)
    // Store the location data
    localStorage.setItem("userLocation", JSON.stringify({ state, city }))
    // Store that user has responded
    localStorage.setItem("locationPromptResponse", "true")

    onOpenChange(false)
    router.push("/")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-none bg-zinc-900 text-white border-zinc-800">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <DialogTitle className="text-white text-base font-normal flex items-center gap-2">
            web.umang.gov.in wants to
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-zinc-400 hover:text-white hover:bg-zinc-800"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="flex items-center gap-2 py-3">
          <MapPin className="h-5 w-5 text-zinc-400" />
          <span className="text-sm">Know your location</span>
        </div>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="state" className="text-white">
              Select State
            </Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger id="state" className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {states.map((state) => (
                  <SelectItem key={state} value={state} className="text-white hover:bg-zinc-700">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="text-white">
              Select City
            </Label>
            <Select value={city} onValueChange={setCity} disabled={!state}>
              <SelectTrigger id="city" className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Select city" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border-zinc-700">
                {state &&
                  cities[state]?.map((city) => (
                    <SelectItem key={city} value={city} className="text-white hover:bg-zinc-700">
                      {city}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-sm h-10"
            onClick={handleSubmit}
            disabled={!state || !city || loading}
          >
            {loading ? "Setting location..." : "Allow while visiting the site"}
          </Button>
          <Button
            variant="ghost"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-sm h-10"
            onClick={() => {
              localStorage.setItem("locationPromptResponse", "true")
              onOpenChange(false)
            }}
          >
            Never allow
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

