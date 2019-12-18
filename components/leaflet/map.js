import React, { useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import L from 'leaflet'
import { forEach } from 'lodash'

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

  const drawLocCir = ({ map, latitude, longitude }) => {
    const svg = d3.select(map.getPanes().overlayPane).select('svg')
    // const g = svg.select('g')

    const data = [
      { 'coords': [latitude, longitude] },
      { 'coords': [latitude + 0.01, longitude] },
      { 'coords': [latitude, longitude + 0.01] },
    ].map((d) => { 
      const geo = map.latLngToLayerPoint(d.coords)
      d.coords = { 'x' : geo.x, 'y' : geo.y }
      return d
    })

    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => d.coords.x) 
      .attr('cy', d => d.coords.y)
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
            .attr('cx', d => d.coords.x) 
            .attr('cy', d => d.coords.y)
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
            .on('start', repeat)
      })
  }

  const drawPloygen = ({ map, aploygengeojson}) => {
    const svg = d3.select(map.getPanes().overlayPane).select('svg')
    // const g = svg.select('g')

    function projectPoint(x, y) {
      let point = map.latLngToLayerPoint(new L.LatLng(y, x))
      this.stream.point(point.x, point.y);
    }

    const transform = d3.geoTransform({point: projectPoint})
    const geoPath = d3.geoPath().projection(transform)

    const featureElement = svg.selectAll('path')
      .data(aploygengeojson.features)
      .enter()
      .append('path')
      .attr('stroke', 'gray')
      .attr('fill', 'purple')
      .attr('fill-opacity', 0.6)
    
    const update = () => {
      featureElement.attr('d', geoPath)
    }

    update()
  }

  const drawCirlcle = ({ map, acirclegeojson }) => {
    const svg = d3.select(map.getPanes().overlayPane).select('svg')
    const g = svg.select('g')

    const saJson = acirclegeojson['features'][0]['geometry']['coordinates']
    const sbJson = acirclegeojson['features'][0]['properties']['radius']

    const data = [
      { 'coords': [saJson[1], saJson[0]] },
    ].map((d) => { 
      const geo = map.latLngToLayerPoint(d.coords)
      d.coords = { 'x' : geo.x, 'y' : geo.y }
      return d
    })

    const mapScaleInMeters = ({ map }) => {
      const x = map.getSize().x
      const y = map.getSize().y
  
      const maxMeters = map.containerPointToLatLng([0, y]).distanceTo(map.containerPointToLatLng([x,y]))
      return maxMeters / x
    }

    const mapScaleInMetersValue = mapScaleInMeters({map})
    const rInSvg = sbJson / mapScaleInMetersValue

    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => d.coords.x) 
      .attr('cy', d => d.coords.y)
      .attr('r', rInSvg)
      .style('fill', 'black')
      .style('opacity', '0.4')
  }

  const geoJsonLeaflet = ({ map }) => {
    const json = {
      "type": "FeatureCollection",
      "features": [{
          "type": "Feature",
          "properties": {
              "shape": "Circle",
              "radius": 1323.9850473588563,
              "name": "Unnamed Layer",
              "category": "default",
              "id": "6c64dd23-1a6d-4fd9-8daa-472b48c874dd"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [115.537376, 38.877002]
          }
      }, {
          "type": "Feature",
          "properties": {
              "shape": "Circle",
              "radius": 1132.9914476972826,
              "name": "Unnamed Layer",
              "category": "default",
              "id": "d75fffb5-a390-4db0-86b7-80ec083c084c"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [115.498753, 38.854414]
          }
      }]
    }

    forEach(json['features'], (geo, ind) => {
      L.geoJSON(geo, {
        pointToLayer: (feature, latlng) => {
          if (feature.properties.radius) {
            return new L.Circle(latlng, feature.properties.radius)
          }
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties.shape == 'Circle') {
            layer.addTo(map)
          }
        }
      })
    })
  }

  const draw = ({ map , geojson }) => {
    const svg = d3.select(map.getPanes().overlayPane).select('svg')
    const g = svg.select('g')

    const mapScaleInMeters = ({ map }) => {
      const x = map.getSize().x
      const y = map.getSize().y
  
      const maxMeters = map.containerPointToLatLng([0, y]).distanceTo(map.containerPointToLatLng([x,y]))
      return maxMeters / x
    }

    //如果不是数组，也可以转换成数组使用
    const datacircle = geojson['features'].map((d) => { 
      if ( d['properties']['shape'] == "Circle" ) {
        const sbJson = geojson['features'][0]['properties']['radius']
        const mapScaleInMetersValue = mapScaleInMeters({ map })
        const rInSvg = sbJson / mapScaleInMetersValue

        //latLngToLayerPoint() return Piont{x: , y: ,} object
        const geo = map.latLngToLayerPoint([d['geometry']['coordinates'][1], d['geometry']['coordinates'][0]])

        d.recoordCircle = { 'x' : geo.x, 'y' : geo.y, 'r': rInSvg,}
      } else {
        d.recoordCircle = { 'x' : 0, 'y' : 0, 'r': 0,}
      }
      return d
    })

    const dataPolygon = geojson['features'].map((d) => {
      if (d['properties']['shape'] == "Polygon") {
        return d
      }
    })

    g.selectAll('circle')
      .data(datacircle)
      .enter()
      .append('circle')
      .attr('cx', d => d['recoordCircle']['x']) //省略参数的用法
      .attr('cy', d => d['recoordCircle']['y'])
      .attr('r', d => d['recoordCircle']['r'])
      .style('fill', 'red')
      .style('opacity', '0.4')

    function projectPoint(x, y) {
      let point = map.latLngToLayerPoint(new L.LatLng(y, x))
      this.stream.point(point.x, point.y);
    }

    const transform = d3.geoTransform({point: projectPoint})
    const geoPath = d3.geoPath().projection(transform)

    g.selectAll('path')
      .data(dataPolygon)
      .enter()
      .append('path')
      .attr('stroke', 'gray')
      .attr('fill', 'purple')
      .attr('fill-opacity', 0.6)
      .attr('d', geoPath)
  }

  const geoJSONdraw = ({ map }) => {
    var geojsonFeature = {
      "type": "Feature",
      "properties": {
          "name": "Coors Field",
          "amenity": "Baseball Stadium",
          "popupContent": "This is where the Rockies play!"
      },
      "geometry": {
          "type": "Point",
          "coordinates": [115.574494, 38.895534]
      }
    };

    var myLayer = L.geoJSON().addTo(map);
    myLayer.addData(geojsonFeature);
    // L.geoJSON(geojsonFeature).addTo(map);

    var myLines = [{
      "type": "LineString",
      "coordinates": [[115.5806, 38.8929], [115.6022, 38.8920], [115.5933,38.9011]]
    }, {
      "type": "LineString",
      "coordinates": [[115.5706, 38.8929], [115.5822, 38.8920], [115.5733,38.9011]]
    }];

    var myStyle = {
      "color": "red",
      "weight": 5,
      "opacity": 0.65
    };
  
    L.geoJSON(myLines, {
        style: myStyle
    }).addTo(map)

    var states = [{
      "type": "Feature",
      "properties": {"party": "Republican"},
      "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [115.5806, 38.9129], 
            [115.6022, 38.9120], 
            [115.5933,38.9211],
            [115.5806, 38.9129]
          ]]
      }
    }, {
      "type": "Feature",
      "properties": {"party": "Democrat"},
      "geometry": {
          "type": "Polygon",
          "coordinates": [[
            [115.5906, 38.8929], 
            [115.6022, 38.8920], 
            [115.5933,38.9011]
          ]]
      }
    }]
  
    L.geoJSON(states, {
        style: function(feature) {
            switch (feature.properties.party) {
                case 'Republican': return {color: "blue"};
                case 'Democrat':   return {color: "green"};
            }
        }
    }).addTo(map);
  }

  const drawPicture = ({ map }) => {
    var pictureURL = "https://www.diyifanwen.com/images/hebei/087222329168198.jpg"
    var bounds = L.latLngBounds([[38.9011, 115.5933], [39.0011, 115.6933]])
    L.rectangle(bounds).addTo(map)
    L.imageOverlay(pictureURL, bounds).addTo(map)
  }

  useEffect(async () => {
    let { latitude, longitude } = await fetchLocation()

    const map = L.map('map').setView([latitude, longitude], 12)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
    }).addTo(map)

    const aploygengeojson = {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "properties": {
          "shape": "Line",
          "name": "Sample Ploygen"
        },
        "geometry": {
          "type": "LineString",
          "coordinates": [
            [115.518494, 38.862434],
            [115.551109, 38.872993],
            [115.563297, 38.85174],
            [115.528278, 38.842382],
            [115.54493, 38.823126],
            [115.581493, 38.838237],
            [115.575657, 38.810821],
            [115.553856, 38.809082],
            [115.494461, 38.810687],
            [115.48502, 38.830481],
            [115.498066, 38.842382],
            [115.48708, 38.858959],
            [115.518494, 38.862434]
          ]
        }
      }]
    }

    const acirclegeojson = {
      "type": "FeatureCollection",
      "features": [{
          "type": "Feature",
          "properties": {
              "shape": "Circle",
              "radius": 658.3624718356838,
              "name": "Unnamed Layer",
              "category": "default",
              "id": "3bc350da-8151-4eee-91f6-56a67d20b583"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [115.496463, 38.862227]
          }
      }]
    }

    const geojson = {
      "type": "FeatureCollection",
      "features": [{
          "type": "Feature",
          "properties": {
              "shape": "Circle",
              "radius": 1000.9850473588563,
              "name": "Unnamed Layer",
              "category": "default",
              "id": "6c64dd23-1a6d-4fd9-8daa-472b48c874dd"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [115.637376, 38.877002]
          }
      }, {
          "type": "Feature",
          "properties": {
              "shape": "Circle",
              "radius": 1132.9914476972826,
              "name": "Unnamed Layer",
              "category": "default",
              "id": "d75fffb5-a390-4db0-86b7-80ec083c084c"
          },
          "geometry": {
              "type": "Point",
              "coordinates": [115.6398753, 38.854414]
          }
      }, {
        "type": "Feature",
        "properties": {
            "shape": "Polygon",
            "name": "Unnamed Layer",
            "category": "default",
            "id": "0fdc4b6e-397c-4810-8033-056d2b908732"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [115.528278, 38.85428],
                    [115.519352, 38.829813],
                    [115.557804, 38.83008],
                    [115.589046, 38.857087],
                    [115.528278, 38.85428]
                ]
            ]
        },
      }, {
        "type": "Feature",
        "properties": {
            "shape": "Polygon",
            "name": "Unnamed Layer",
            "category": "default",
            "id": "0fdc4b6e-397c-4810-8033-056d2b908732"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [115.538278, 38.84428],
                    [115.519352, 38.829813],
                    [115.589046, 38.857087],
                    [115.538278, 38.84428],
                ]
            ]
        },
      }]
    }

    map.on('click', onMapClick(map) )

    L.svg().addTo( map )

    drawLocCir({ map, latitude, longitude })

    drawPloygen({ map, aploygengeojson })

    // drawCirlcle({ map, acirclegeojson})

    geoJsonLeaflet({ map })

    draw({ map ,geojson })

    geoJSONdraw({ map })

    drawPicture({ map })
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
