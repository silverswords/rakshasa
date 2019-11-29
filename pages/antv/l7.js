import React from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'

const L7Scene = dynamic(
  import('../../components/antv/scene'),
  { ssr: false }
)

const L7 = () => {
  return (
    <div>
      <Head>
        <title>L7 Basic</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <L7Scene />
    </div>
  )
}

export default L7
