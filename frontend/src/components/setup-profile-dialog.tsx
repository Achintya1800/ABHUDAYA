"use client"

import type React from "react"

import { Camera, Calendar, ArrowLeft, User } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Profile {
  id: string
  name: string
  avatar?: string
  relation?: string
  dateOfBirth?: string
  gender?: string
}

interface SetupProfileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddProfile: (profile: Profile) => void
}

export function SetupProfileDialog({ open, onOpenChange, onAddProfile }: SetupProfileDialogProps) {
  const [name, setName] = useState("")
  const [relation, setRelation] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [gender, setGender] = useState("")
  const [previewImage, setPreviewImage] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !relation || !dateOfBirth || !gender) return

    const newProfile: Profile = {
      id: Date.now().toString(),
      name,
      relation,
      dateOfBirth,
      gender,
      avatar: previewImage || undefined,
    }
    onAddProfile(newProfile)

    // Reset form
    setName("")
    setRelation("")
    setDateOfBirth("")
    setGender("")
    setPreviewImage("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 gap-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-100"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-lg font-semibold">Setup your SubProfile</DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <Avatar className="h-28 w-28 border-2 border-gray-200">
                {previewImage ? (
                  <AvatarImage src={previewImage} alt="Preview" className="object-cover" />
                ) : (
                  <AvatarFallback className="bg-gray-100">
                    <User className="h-12 w-12 text-gray-400" />
                  </AvatarFallback>
                )}
              </Avatar>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
              <Button
                size="icon"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <Input
                placeholder="Full Name"
                className="h-11"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Relation <span className="text-red-500">*</span>
              </label>
              <Select value={relation} onValueChange={setRelation} required>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select Relation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spouse">Spouse</SelectItem>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="sibling">Sibling</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="date"
                  placeholder="Select your DOB"
                  className="h-11"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select your Gender <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["Male", "Female", "Other"].map((option) => (
                  <Button
                    key={option}
                    type="button"
                    variant="outline"
                    className={`h-11 ${
                      gender === option
                        ? "border-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-50"
                        : "border-gray-300 text-gray-700"
                    }`}
                    onClick={() => setGender(option)}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!name || !relation || !dateOfBirth || !gender}
            >
              Add Profile
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

