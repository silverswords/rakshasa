import React, { useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import L from 'leaflet'

const LeafletMap = () => {
  const fetchIpAddress = async () => {
    try {
      let resp = await fetch('http://ifconfig.co/json')
      return resp.json()
    } catch(err) {
      return {
        ip: '1.2.3.4',
      }
    }
  }

  const fetchLocation = async () => {
    try {
      const { ip } = await fetchIpAddress()
      const url = `http://api.ipstack.com/${ip}?access_key=7155325261b9e5c41a079905c153643b&format=1`
      let resp = await fetch(url)
      return resp.json()
    } catch(err) {
      return {
        'latitude': 39.9042,
        'longitude': 116.4074,
      }
    }
  }

  const onMapClick = (map) => {
    return (e) => {
      let popup = L.popup()

      popup
        .setLatLng(e.latlng)
        .setContent('You clicked the map at ' + e.latlng.toString())
        .openOn(map)
      
      L.circle(e.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 100
      }).addTo(map)
    }
  }

  const drawD3Circle = ({ map, latitude, longitude }) => {
    const svg = d3.select(map.getPanes().overlayPane).select('svg')
    const g = svg.select('g')

    const data = [
      { 'coords': [latitude, longitude] },
    ].map((d) => { 
      const geo = map.latLngToLayerPoint(d.coords)
      d.coords = { 'x' : geo.x, 'y' : geo.y }
      return d
    })

    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', "50%") 
      .attr('cy', "50%")
      .attr('r', 20)
      .style('fill', '#4e54c8')
      .style('opacity', '0.4')
      .transition()
      .duration(2000)
      .transition()
      .on('start', function repeat() {
        d3.active(this)
          .transition()
          .duration(500)
          .attr('r', 21)
          .style('fill', '#4e54c8')
          .transition()
          .duration(500)
          .attr('r', 22)
          .transition()
          .duration(500)
          .attr('r', 23)
          .style('fill', '#5e54c8')
          .transition()
          .duration(500)
          .attr('r', 24)
          .transition()
          .duration(500)
          .attr('r', 25)
          .attr('cx', "25%") 
          .attr('cy', "25%")
          .transition()
          .duration(500)
          .attr('r', 26)
          .style('fill', '#6e54c8')
          .transition()
          .duration(500)
          .attr('r', 27)
          .transition()
          .duration(500)
          .attr('r', 28)
          .style('fill', '#7e54c8')
          .transition()
          .duration(500)
          .attr('r', 29)
          .transition()
          .duration(500)
          .attr('r', 30)
          .style('fill', '#8f94fb')
          .attr('cx', "75%") 
          .attr('cy', "25%")
          .transition()
          .duration(500)
          .attr('r', 29)
          .transition()
          .duration(500)
          .attr('r', 28)
          .style('fill', '#7e54c8')
          .transition()
          .duration(500)
          .attr('r', 27)
          .transition()
          .duration(500)
          .attr('r', 26)
          .style('fill', '#6e54c8')
          .transition()
          .duration(500)
          .attr('r', 25)
          .attr('cx', "75%") 
          .attr('cy', "75%")
          .transition()
          .duration(500)
          .attr('r', 24)
          .transition()
          .duration(500)
          .attr('r', 23)
          .style('fill', '#5e54c8')
          .transition()
          .duration(500)
          .attr('r', 22)
          .transition()
          .duration(500)
          .attr('r', 21)
          .style('fill', '#4e54c8')
          .transition()
          .attr('cx', "25%") 
          .attr('cy', "75%")
          .on('start', repeat)
 })
  }

  useEffect(async () => {
    let { latitude, longitude } = await fetchLocation()

    const map = L.map('map').setView([latitude, longitude], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map)

    L.marker([latitude, longitude]).addTo(map).bindPopup('<b>I\'m here!</b>').openPopup()

    L.svg().addTo(map)
    drawD3Circle({ map, latitude, longitude })

    map.on('click', onMapClick(map))

    map.on('viewreset', drawD3Circle)
  }, [])

  return (
    <div id='map'>
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
