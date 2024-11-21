import { NextResponse } from "next/server"
import axios from "axios"

const SOCRATA_API_ENDPOINT = "https://data.cityofnewyork.us/resource/gkne-dk5s.json"
const SOCRATA_APP_TOKEN = process.env.SOCRATA_APP_TOKEN

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get("limit") || "1000"
  const offset = searchParams.get("offset") || "0"
  const where = searchParams.get("where") || ""

  try {
    const response = await axios.get(SOCRATA_API_ENDPOINT, {
      params: {
        $limit: limit,
        $offset: offset,
        $where: where,
        $$app_token: SOCRATA_APP_TOKEN
      }
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error fetching taxi data:", error)
    return NextResponse.json({ error: "Failed to fetch taxi data" }, { status: 500 })
  }
}
