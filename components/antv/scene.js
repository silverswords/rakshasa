import React, { useEffect } from 'react'
import { Scene, HeatmapLayer } from '@antv/l7';
import { GaodeMap } from '@antv/l7-maps'
import fetch from 'isomorphic-unfetch'

const L7Scene = () => {
  const showCSV = ({ scene }) => {
    fetch('https://gw.alipayobjects.com/os/basement_prod/7359a5e9-3c5e-453f-b207-bc892fb23b84.csv')
      .then(res => res.text())
      .then(data => {
        const layer = new HeatmapLayer({})
          .source(data, {
            parser: {
              type: 'csv',
              x: 'lng',
              y: 'lat'
            },
            transforms: [
              {
                type: 'grid',
                size: 20000,
                field: 'v',
                method: 'sum'
              }
            ]
          })
          .size('count', value => {
            return value * 0;
          })
          .shape('circle')
          .style({
            coverage: 0.9,
            angle: 0
          })
          .color(
            'count',
            [
              '#8C1EB2',
              '#8C1EB2',
              '#DA05AA',
              '#F0051A',
              '#FF2A3C',
              '#FF4818',
              '#FF4818',
              '#FF8B18',
              '#F77B00',
              '#ED9909',
              '#ECC357',
              '#EDE59C'
            ].reverse()
          )
      scene.addLayer(layer)
    })
  }

  useEffect(async () => {
    const scene = new Scene({
      id: 'map',
      map: new GaodeMap({
        style: 'light',
        pitch: 0,
        center: [ 107.054293, 35.246265 ],
        zoom: 4.056
      })
    })

    showCSV({ scene })
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

export default L7Scene
