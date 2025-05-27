import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

const popularServices = [
  { name: "Aadhaar Services", icon: "🆔" },
  { name: "PAN Card Services", icon: "💳" },
  { name: "Passport Services", icon: "🛂" },
  { name: "Driving License", icon: "🚗" },
  { name: "Voter ID Services", icon: "🗳️" },
  { name: "Birth Certificate", icon: "👶" },
]

const categories = ["Health & Wellness", "Education", "Agriculture", "Employment", "Transportation", "Social Welfare"]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 ml-[250px] p-6">
          <div className="max-w-[1600px] mx-auto space-y-6">
            <h1 className="text-2xl font-bold mb-6">Services</h1>

            <Card>
              <CardHeader>
                <CardTitle>Search Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input placeholder="Search for a service..." className="flex-1" />
                  <Button>
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {popularServices.map((service) => (
                    <Button
                      key={service.name}
                      variant="outline"
                      className="h-24 flex flex-col items-center justify-center text-center"
                    >
                      <span className="text-2xl mb-2">{service.icon}</span>
                      <span className="text-sm">{service.name}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Browse by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Button key={category} variant="outline" className="justify-start">
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

