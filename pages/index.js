import React, { useEffect } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const LeafletMap = dynamic(
  import('../components/leaflet/map'),
  { ssr: false }
)

const Index = () => {
  return (
    <div>
      <Head>
        <title>Leaflet Basic</title>
        <link rel='icon' href='/favicon.ico' />
        <link href="/leaflet.css" rel="stylesheet" />
        <script src='/d3.min.js'></script>
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

export default Index
