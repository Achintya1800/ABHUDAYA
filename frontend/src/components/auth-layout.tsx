import type React from "react"
import Image from "next/image"
import { LanguageSelector } from "./language-selector"
import { ThemeToggle } from "./theme-toggle"

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="hidden w-[35%] bg-[#001F3F] lg:block">
        <div className="flex h-full flex-col">
          <div className="p-6">
            
          </div>
          <div className="relative flex-1">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at center, #0066B3 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
                opacity: 0.15,
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-end gap-4 p-4">
          <LanguageSelector />
          <ThemeToggle />
        </div>
        <main className="flex flex-1 items-center justify-center p-8">{children}</main>
      </div>
    </div>
  )
}

