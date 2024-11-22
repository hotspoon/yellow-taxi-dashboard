"use client"

import { useMemo, useRef, useState } from "react"
import { Title } from "@tremor/react"
import TripChart from "./TripChart"
import FilterPanel from "./FilterPanel"
import useTaxiData from "@/hooks/useTaxiData"
import "leaflet/dist/leaflet.css"
import DynamicTripMap from "./DynamicTripMap"
import { Card } from "./ui/card"
import { Spinner } from "./ui/spinner"

export default function Dashboard() {
  const [filters, setFilters] = useState({})
  const { data, isLoading, error } = useTaxiData(filters)
  const renderCount = useRef(0)
  const memoizedData = useMemo(() => data, [data])

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    )
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="space-y-6">
      <Title className="text-center text-2xl font-bold">Yellow Taxi Trip Dashboard</Title>
      <FilterPanel onFilterChange={setFilters} />
      <div className="grid grid-cols-1 gap-6">
        <Card>{memoizedData && <DynamicTripMap data={memoizedData} />}</Card>
      </div>
      <div className="grid grid-cols-1 gap-6">
        <Card>{memoizedData && <TripChart data={memoizedData} />}</Card>
      </div>
    </div>
  )
}
