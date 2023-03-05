import React, { useState, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Map from 'src/views/map'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const { pickup, dropoff } = router.query
  const [center, setCenter] = useState({ latitude: null, longitude: null })

  const pickUpCoordinates = pickup && [pickup.split(',')[0], pickup.split(',')[1]]
  const dropoffCoordinates = dropoff && [dropoff.split(',')[0], pickup.split(',')[1]]

  console.log('pickupCoordinates : ', pickUpCoordinates, 'dropoffCoordinates : ', dropoffCoordinates)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          setCenter({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        error => {
          console.log(error)
        }
      )
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }, [])

  return (
    <>
      <Map center={center} pickUpCoordinates={pickUpCoordinates} dropoffCoordinates={dropoffCoordinates} />
    </>
  )
}

export default Home
