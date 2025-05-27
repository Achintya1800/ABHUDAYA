"use client"

import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default marker icons
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: () => void })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/marker-icon-2x.png",
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
})

export default function Map() {
  return (
    <MapContainer center={[28.6139, 77.209]} zoom={10} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={[28.6139, 77.209]} />
    </MapContainer>
  )
}

