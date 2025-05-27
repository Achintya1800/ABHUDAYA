"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import dynamic from "next/dynamic"

const Map = dynamic(() => import("./map"), { ssr: false })

export function LocalCenters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Local Centers Near Me</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-2">
          <Input placeholder="Search centers or services..." />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="h-[300px] rounded-md border">
          <Map />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">CSC Center {i}</h4>
                <p className="text-sm text-muted-foreground">
                  Services: {i === 1 ? "Aadhaar, PAN" : i === 2 ? "Passport, Driving License" : "Voter ID, Ration Card"}
                </p>
              </div>
              <Button variant="outline" onClick={() => window.open("https://findmycsc.nic.in/csc/", "_blank", "noopener,noreferrer")}>
               View Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

