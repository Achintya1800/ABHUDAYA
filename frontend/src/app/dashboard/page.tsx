import HeroSection from "@/components/hero-section"
import DocumentsSection from "@/components/documents-section"

export default function UserHomePage() {
  return (
    <div className="max-w-[1400px] mx-auto p-6 space-y-8">
      <HeroSection showSearch={true} />
      <DocumentsSection />
    </div>
  )
}

