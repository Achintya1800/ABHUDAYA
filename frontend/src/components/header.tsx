"use client"

import { Bell, Search, Menu, ChevronRight, Plus, Settings, LogOut, User } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import GeminiChatbot from "@/components/GeminiChatbot"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { SetupProfileDialog } from "./setup-profile-dialog"
import GoogleTranslate from "@/components/google-translate"

interface Profile {
  id: string
  name: string
  avatar?: string
}

export function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("English")
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false)
  const [profiles, setProfiles] = useState<Profile[]>([{ id: "1", name: "Achintya" }])
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [detectedText, setDetectedText] = useState("");
  const handleAddProfile = (newProfile: Profile) => {
    setProfiles([...profiles, newProfile])
    setIsProfileDialogOpen(false)
  }

  const handleRunPython = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/python/run-python");
      console.log("Detected res:", res);
      const data = await res.json();
      console.log("Detected data:", data);
      if (data.output) {
        const text = data.output.trim(); // Use the final predicted string
        console.log("Detected Text:", text); // Print the detected text
        setDetectedText(text);
        setIsChatbotOpen(true); // Open chatbot after receiving detected text
      } else {
        console.error("Invalid response format:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex h-full items-center px-6 justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(!isSidebarOpen)}>
              <Menu className="h-6 w-6 text-gray-600" />
            </Button>
            <div className="flex items-center gap-3">
              <Image src="/image.png" alt="UMANG" width={40} height={40} className="h-10 w-auto" />
              <span className="text-xl font-bold text-gray-800 tracking-wide">ABHUDAYA</span>
            </div>
          </div>

          {/* Center Section */}
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder='Search For "Schemes"'
                className="w-full pl-12 h-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-gray-600 focus:border-gray-600"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-5">
            <Button
              onClick={handleRunPython}
              variant="outline"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
            >
              <Image src="/ISL.png" alt="ISL Chatbot" width={20} height={20} />
              ISL Chatbot
            </Button>
          {/* Render GeminiChatbot */}
            <GeminiChatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} detectedText={detectedText} />
    
            {/* Notifications Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-6 w-6 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center font-medium">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 shadow-lg rounded-lg">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>New scheme available</DropdownMenuItem>
                <DropdownMenuItem>Document verified</DropdownMenuItem>
                <DropdownMenuItem>Payment received</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <GoogleTranslate/>
            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback>AC</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-700">Achintya</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0 shadow-xl rounded-2xl bg-white">
                <Card className="border-0 shadow-none">
                  {/* Profile Header */}
                  <div className="p-4 group cursor-pointer hover:bg-gray-50 transition-colors rounded-t-2xl">
                    <div className="flex items-start gap-4">
                      <div className="relative">
                        <div className="rounded-full bg-red-50 p-4">
                          <User className="h-6 w-6 text-gray-700" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-red-100 text-red-600 text-xs font-medium px-1.5 py-0.5 rounded-full">
                          1 / 10
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-base font-semibold text-gray-900">Hey,</p>
                            <p className="text-sm text-gray-600">9773706044</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                        </div>
                        <Badge className="mt-2 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                          Admin
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-gray-100" />

                  {/* Manage Profiles Section */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-sm font-medium text-gray-900">Manage Profiles ({profiles.length}/4)</p>
                      <Button
                        variant="link"
                        className="text-sm text-blue-600 p-0 h-auto font-medium hover:text-blue-700 hover:no-underline"
                      >
                        Edit
                      </Button>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2">
                      {profiles.map((profile) => (
                        <div key={profile.id} className="flex flex-col items-center gap-1.5 flex-shrink-0">
                          <Avatar className="h-14 w-14 border-2 border-gray-100">
                            {profile.avatar ? (
                              <AvatarImage src={profile.avatar} alt={profile.name} />
                            ) : (
                              <AvatarFallback className="bg-gray-50 text-gray-700 text-lg font-medium">
                                {profile.name[0].toUpperCase()}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span className="text-xs font-medium text-gray-600">{profile.name}</span>
                        </div>
                      ))}

                      {profiles.length < 4 && (
                        <Button
                          variant="outline"
                          className="h-14 w-14 rounded-full border-2 border-dashed border-gray-300 hover:border-gray-400 hover:bg-gray-50 flex-shrink-0"
                          onClick={() => setIsProfileDialogOpen(true)}
                        >
                          <Plus className="h-5 w-5 text-gray-500" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <DropdownMenuSeparator className="bg-gray-100" />

                  {/* Settings and Logout */}
                  <div className="p-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-50 gap-3 rounded-lg h-11"
                    >
                      <Settings className="h-5 w-5" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 gap-3 rounded-lg h-11"
                    >
                      <LogOut className="h-5 w-5" />
                      Log out
                    </Button>
                  </div>
                </Card>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <SetupProfileDialog
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        onAddProfile={handleAddProfile}
      />
    </>
  )
}

export default Header