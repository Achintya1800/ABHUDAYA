"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

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

export function MonthlyEarnings() {
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
            <Tooltip />
            <Bar dataKey="actual" name="Actual Income" fill="hsl(262, 80%, 50%)" />
            <Bar dataKey="forecast" name="Forecasted Income" fill="hsl(262, 80%, 70%)" />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm">
          <p><strong>Notes:</strong></p>
          <ul className="list-disc list-inside">
            <li>The "Actual Income" represents the realized earnings for each month.</li>
            <li>The "Forecasted Income" is based on predictive models and market trends.</li>
            <li>Performance gaps are most notable in January and February, where forecasts exceeded actual income significantly.</li>
            <li>Overall, the latter half of the year showed better alignment between actual and forecasted earnings.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

