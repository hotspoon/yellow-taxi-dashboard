"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

export default function TripChart({ data }: any) {
  const chartData = data.reduce(
    (acc: { [key: number]: number }, trip: { pickup_datetime: string }) => {
      const hour = new Date(trip.pickup_datetime).getHours()
      acc[hour] = (acc[hour] || 0) + 1
      return acc
    },
    {}
  )

  const formattedData = Object.entries(chartData).map(([hour, count]) => ({
    hour: `${hour}:00`,
    count
  }))

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Trips by Hour</h3>
      <BarChart width={500} height={300} data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  )
}
