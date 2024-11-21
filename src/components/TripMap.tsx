import { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

export default function TripMap({ data }: any) {
  const [popupInfo, setPopupInfo] = useState(null)
  const mapRef = useRef<any>(null)

  const center: [number, number] = [40.7128, -74.006] // New York City coordinates

  useEffect(() => {
    if (mapRef.current && mapRef.current._leaflet_id) {
      mapRef.current.invalidateSize()
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.off()
        mapRef.current.remove()
      }
    }
  }, [data])

  return (
    <MapContainer ref={mapRef} center={center} zoom={11} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.map((trip: any, index: number) => (
        <Marker
          key={index}
          position={[Number(trip.pickup_latitude), Number(trip.pickup_longitude)]}
          eventHandlers={{
            click: () => {
              setPopupInfo(trip)
            }
          }}
        >
          {popupInfo === trip && (
            <Popup>
              <div>
                <h3>Trip Details</h3>
                <p>Fare: ${trip.fare_amount}</p>
                <p>Distance: {trip.trip_distance} miles</p>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  )
}
