import { DateRange } from "react-day-picker"

export interface FilterState {
  dateRange: DateRange | undefined
  minFare: string
  maxFare: string
  minDistance: string
  maxDistance: string
  paymentType: string
}
