import useSWR from "swr"
import { useMemo } from "react"
import { format } from "date-fns"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function useTaxiData(filters: any) {
  const { dateRange, minFare, maxFare, minDistance, maxDistance, paymentType } = filters

  const whereClause = useMemo(() => {
    let clauses = []

    if (dateRange && dateRange.length === 2) {
      const [start, end] = dateRange
      clauses.push(
        `pickup_datetime between '${format(start, "yyyy-MM-dd'T'HH:mm:ss")}' and '${format(
          end,
          "yyyy-MM-dd'T'HH:mm:ss"
        )}'`
      )
    }

    if (minFare) clauses.push(`fare_amount >= ${minFare}`)
    if (maxFare) clauses.push(`fare_amount <= ${maxFare}`)
    if (minDistance) clauses.push(`trip_distance >= ${minDistance}`)
    if (maxDistance) clauses.push(`trip_distance <= ${maxDistance}`)
    if (paymentType) clauses.push(`payment_type = '${paymentType}'`)

    return clauses.length > 0 ? clauses.join(" AND ") : ""
  }, [dateRange, minFare, maxFare, minDistance, maxDistance, paymentType])

  const { data, error } = useSWR(
    `/api/taxi-data?limit=1000&where=${encodeURIComponent(whereClause)}`,
    fetcher
  )

  const filteredData = useMemo(() => {
    if (!data) return []
    return data.filter((trip: any) => {
      if (minFare && trip.fare_amount < parseFloat(minFare)) return false
      if (maxFare && trip.fare_amount > parseFloat(maxFare)) return false
      if (minDistance && trip.trip_distance < parseFloat(minDistance)) return false
      if (maxDistance && trip.trip_distance > parseFloat(maxDistance)) return false
      if (paymentType && trip.payment_type !== paymentType) return false
      return true
    })
  }, [data, minFare, maxFare, minDistance, maxDistance, paymentType])

  return {
    data: filteredData,
    isLoading: !error && !data,
    error
  }
}
