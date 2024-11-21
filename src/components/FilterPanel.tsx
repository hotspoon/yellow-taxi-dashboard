"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { DateRangePicker } from "react-date-range"
import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

interface Filters {
  dateRange: { startDate: Date; endDate: Date; key: string }
  minFare: string
  maxFare: string
  minDistance: string
  maxDistance: string
  paymentType: string
}

interface FilterPanelProps {
  onFilterChange: (filters: any) => void
}

export default function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [filters, setFilters] = useState<Filters>({
    dateRange: { startDate: new Date(), endDate: new Date(), key: "selection" },
    minFare: "",
    maxFare: "",
    minDistance: "",
    maxDistance: "",
    paymentType: ""
  })

  const handleChange = (key: keyof Filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleDateRangeChange = (ranges: any) => {
    const { selection } = ranges
    handleChange("dateRange", {
      startDate: selection.startDate,
      endDate: selection.endDate,
      key: "selection"
    })
  }

  const handleApplyFilters = () => {
    onFilterChange(filters)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Trips</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="date-range">Date Range</Label>
            <DateRangePicker
              ranges={[filters.dateRange]}
              onChange={handleDateRangeChange}
              moveRangeOnFirstSelection={false}
              rangeColors={["#3b82f6"]}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="min-fare">Min Fare ($)</Label>
              <Input
                id="min-fare"
                placeholder="0.00"
                value={filters.minFare}
                onChange={(e) => handleChange("minFare", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max-fare">Max Fare ($)</Label>
              <Input
                id="max-fare"
                placeholder="100.00"
                value={filters.maxFare}
                onChange={(e) => handleChange("maxFare", e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="min-distance">Min Distance (miles)</Label>
              <Input
                id="min-distance"
                placeholder="0.0"
                value={filters.minDistance}
                onChange={(e) => handleChange("minDistance", e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="max-distance">Max Distance (miles)</Label>
              <Input
                id="max-distance"
                placeholder="50.0"
                value={filters.maxDistance}
                onChange={(e) => handleChange("maxDistance", e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="payment-type">Payment Type</Label>
            <Select
              value={filters.paymentType}
              onValueChange={(value) => handleChange("paymentType", value)}
            >
              <SelectTrigger id="payment-type">
                <SelectValue placeholder="Select payment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="CASH">Cash</SelectItem>
                <SelectItem value="CREDIT">Credit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </div>
      </CardContent>
    </Card>
  )
}
