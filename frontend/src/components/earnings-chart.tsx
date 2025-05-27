"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { month: "Jan", actual: 3000, forecast: 5500 },
  { month: "Feb", actual: 2500, forecast: 3000 },
  { month: "Mar", actual: 1500, forecast: 2000 },
  { month: "Apr", actual: 2000, forecast: 2500 },
  { month: "May", actual: 1500, forecast: 2000 },
  { month: "Jun", actual: 4000, forecast: 4500 },
  { month: "Jul", actual: 4500, forecast: 5000 },
  { month: "Aug", actual: 3500, forecast: 4000 },
  { month: "Sep", actual: 3000, forecast: 3500 },
  { month: "Oct", actual: 2000, forecast: 2500 },
  { month: "Nov", actual: 4500, forecast: 5000 },
  { month: "Dec", actual: 3500, forecast: 4000 },
]

export function EarningsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Earnings Performance Review</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Bar dataKey="actual" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            <Bar dataKey="forecast" fill="hsl(var(--primary)/0.3)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="space-y-2 pt-4">
          <h4 className="font-medium">Notes:</h4>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>The "Actual Income" represents the realized earnings for each month.</li>
            <li>The "Forecasted Income" is based on predictive models and market trends.</li>
            <li>
              Performance gaps are most notable in January and February, where forecasts exceeded actual income
              significantly.
            </li>
            <li>
              Overall, the latter half of the year showed better alignment between actual and forecasted earnings.
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

