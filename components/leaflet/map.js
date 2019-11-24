import React, { useEffect } from 'react'
import L from 'leaflet'
import fetch from 'isomorphic-unfetch'

const LeafletMap = () => {
  const fetchIpLocation = async () => {
    try {
      let resp = await fetch('http://ifconfig.co/json')
      return resp.json()
    } catch(err) {
      return {
        'latitude': 39.9042,
        'longitude': 116.4074,
      }
    }
  }

  useEffect(async () => {
    let { latitude, longitude } = await fetchIpLocation()

    console.log(`[${latitude}, ${longitude}]`)
    const map = L.map('map').setView([latitude, longitude], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map)
  }, [])

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
