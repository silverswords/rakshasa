import React, { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(
  import('../components/leaflet/map'),
  { ssr: false }
)

const Leaflet = () => {
  return (
    <div>
      <Head>
        <title>Leaflet Basic</title>
        <link rel='icon' href='/favicon.ico' />
        <link href="/leaflet.css" rel="stylesheet" />
      </Head>

      <LeafletMap />
    <style jsx global>{`
      body {
        margin: 0;
      }
    `}</style>
    </div>
  )
}

export default Leaflet
