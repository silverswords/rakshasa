import React, { useEffect } from 'react'
import L from 'leaflet'

const LeafletMap = () => {
  useEffect(() => {
    const map = L.map('map').setView([39.9042, 116.4074], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map)
  }, [])

  console.log(`${window.innerHeight}`)

  return (
    <div id="map">
      <style jsx>{`
        #map {
          width: 100%;
          height: ${window.innerHeight}px;
        }
      `}</style>
    </div>
  )
}

export default LeafletMap
