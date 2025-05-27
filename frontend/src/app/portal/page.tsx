import HeroSection from "@/components/hero-section"
import DocumentsSection from "@/components/documents-section"

export default function PortalPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <HeroSection showSearch={true} />
        <DocumentsSection />
      </div>
    </div>
  )
}

