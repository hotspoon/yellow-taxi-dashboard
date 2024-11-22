import { NextResponse } from "next/server"
import axios from "axios"

const SOCRATA_API_ENDPOINT = "https://data.cityofnewyork.us/resource/gkne-dk5s.json"
const SOCRATA_APP_TOKEN = process.env.SOCRATA_APP_TOKEN || ""

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get("limit") || "10"
  const offset = searchParams.get("offset") || "0"
  const startDate = searchParams.get("startDate")
  const endDate = searchParams.get("endDate")
  const minFare = searchParams.get("minFare")
  const maxFare = searchParams.get("maxFare")
  const minDistance = searchParams.get("minDistance")
  const maxDistance = searchParams.get("maxDistance")
  const paymentType = searchParams.get("paymentType")
  const order = searchParams.get("order") || "pickup_datetime DESC"
  const selectColumns = searchParams.get("columns") || "*"

  // Construct the where clause
  const whereClauses = []

  if (startDate) whereClauses.push(`pickup_datetime >= '${startDate}T00:00:00'`)
  if (endDate) whereClauses.push(`dropoff_datetime <= '${endDate}T23:59:59'`)
  if (minFare) whereClauses.push(`fare_amount >= ${minFare}`)
  if (maxFare) whereClauses.push(`fare_amount <= ${maxFare}`)
  if (minDistance) whereClauses.push(`trip_distance >= ${minDistance}`)
  if (maxDistance) whereClauses.push(`trip_distance <= ${maxDistance}`)
  if (paymentType) whereClauses.push(`payment_type = '${paymentType}'`)

  const whereClause = whereClauses.length > 0 ? whereClauses.join(" AND ") : ""

  // Construct query parameters dynamically
  const params: Record<string, string> = {
    $select: selectColumns,
    $limit: limit,
    $offset: offset,
    $order: order,
    $$app_token: SOCRATA_APP_TOKEN
  }

  if (whereClause) {
    params.$where = whereClause
  }

  try {
    console.log(params)
    const response = await axios.get(SOCRATA_API_ENDPOINT, { params })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error fetching taxi data:", error)
    return NextResponse.json({ error: "Failed to fetch taxi data" }, { status: 500 })
  }
}
