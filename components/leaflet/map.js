import React, { useEffect } from 'react'
import L from 'leaflet'
import fetch from 'isomorphic-unfetch'

const LeafletMap = () => {
  const fetchIpLocation = async () => {
    try {
      let resp = await fetch('http://ifconfig.co/json')
      return resp.json()
    } catch(err) {
    }
  }

  const fetchLALLocation = async () => {
    try {
      let { ip } = await fetchIpLocation()
      var url = 'http://api.ipstack.com/' + ip + '?access_key=7155325261b9e5c41a079905c153643b&format=1'
      let resp = await fetch(url)
      return resp.json()
    } catch(err) {
      return {
        'latitude': 39.9042,
        'longitude': 116.4074,
      }
    }
  }

  useEffect(async () => {
    let { latitude, longitude } = await fetchLALLocation()
    console.log(`[${latitude}, ${longitude}]`)

    const map = L.map('map').setView([latitude, longitude], 12)
    L.marker([latitude, longitude]).addTo(map).bindPopup("<b>I'm here!</b>").openPopup();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map)

  var popup = L.popup();
  
	function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
      .openOn(map);
      
      L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100
      }).addTo(map);
	}

  map.on('click', onMapClick);
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
