"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const languages = [
  { label: "English", value: "en" },
  { label: "हिंदी - Hindi", value: "hi" },
  { label: "অসমীয়া - Assamese", value: "as" },
  { label: "বাংলা - Bengali", value: "bn" },
  { label: "ગુજરાતી - Gujarati", value: "gu" },
  { label: "اردو - Urdu", value: "ur" },
  { label: "ਪੰਜਾਬੀ - Punjabi", value: "pa" },
  { label: "ಕನ್ನಡ - Kannada", value: "kn" },
  { label: "മലയാളം - Malayalam", value: "ml" },
  { label: "मराठी - Marathi", value: "mr" },
  { label: "ଓଡ଼ିଆ - Odia", value: "or" },
  { label: "தமிழ் - Tamil", value: "ta" },
  { label: "తెలుగు - Telugu", value: "te" },
]

export function LanguageSelector() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("en")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[150px] justify-between">
          {languages.find((language) => language.value === value)?.label ?? "Select language"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check className={`mr-2 h-4 w-4 ${value === language.value ? "opacity-100" : "opacity-0"}`} />
                  {language.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

