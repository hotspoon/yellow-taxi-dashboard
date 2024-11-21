"use client"

import dynamic from "next/dynamic"
import { Spinner } from "@/components/ui/spinner"
import { useEffect, useState } from "react"

const TripMap = dynamic(() => import("./TripMap"), {
  ssr: false,
  loading: () => <Spinner />
})

interface DynamicTripMapProps {
  data: any
}

export default function DynamicTripMap({ data }: DynamicTripMapProps) {
  const [key, setKey] = useState(0)

  useEffect(() => {
    setKey((prevKey) => prevKey + 1)
  }, [data])

  return <TripMap key={key} data={data} />
}
