import React from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Map from 'src/views/map'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const { pickup, dropoff } = router.query
  console.log('pickup : ', pickup, 'dropoff : ', dropoff)

  return (
    <>
      <Map />
    </>
  )
}

export default Home
