/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

import { useRouter } from 'next/router'

// ** Third Party Components
import { Icon } from '@iconify/react'

// ** hooks
import useJwt from 'src/auth/jwt/useJwt'

// ** Components
import mapboxgl from '!mapbox-gl'
import mapboxDirections from '@mapbox/mapbox-sdk/services/directions'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getDriverDetailsAction, getVehiclesPositionAction } from 'src/store/vehicles/vehiclesAction'
import FallbackSpinner from 'src/@core/components/spinner'
import { resetDriverDetails, resetVehiclePosition } from 'src/store/vehicles/vehiclesSlice'
import { Button } from '@mui/material'

mapboxgl.accessToken =
  'pk.eyJ1IjoiaGFyaXN0cmFja2luZyIsImEiOiJjbGVneWQ3anowanJvM3ZsZDdiNTB2aGk2In0.-YLuxE0bmfGbf8x3GH3n7A'

const Home = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useJwt.getUserData()

  const mapContainer = useRef(null)
  const directionsClient = mapboxDirections({ accessToken: mapboxgl.accessToken })

  const { driversDetailsPending, driverDetails, vehiclePosition } = useSelector(state => state.vehicle)

  const { pickup, dropoff, pickupLocation, dropOffLocation, duration, distance, cost, vehicle } = router.query

  const [intervalId, setIntervalId] = useState(null)
  const [center, setCenter] = useState({ latitude: null, longitude: null })

  const pickUpCoordinates = pickup && [pickup.split(',')[0], pickup.split(',')[1]]
  const dropoffCoordinates = dropoff && [dropoff.split(',')[0], pickup.split(',')[1]]

  const addToMap = (map, coordinates, popupContent) => {
    const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)

    const popup = new mapboxgl.Popup({
      closeButton: false,
      offset: [0, -10]

      // className: 'marker-tooltip'
    }).setHTML(popupContent)

    marker.getElement().addEventListener('mouseenter', () => {
      popup.setLngLat(coordinates).addTo(map)
    })

    marker.getElement().addEventListener('mouseleave', () => {
      popup.remove()
    })
  }

  const getRoute = async (start, end) => {
    const startPoint = [parseFloat(start[0]), parseFloat(start[1])]
    const endPoint = [parseFloat(end[0]), parseFloat(end[1])]

    const response = await directionsClient
      .getDirections({
        waypoints: [{ coordinates: startPoint }, { coordinates: endPoint }],
        profile: 'driving',
        geometries: 'geojson'
      })
      .send()

    if (response.body.code !== 'Ok') {
      throw new Error('No route found')
    }

    const route = response.body.routes[0].geometry

    return route
  }

  useEffect(() => {
    const data = { driver_id: user?.driverId }
    const str = JSON.stringify(data)
    const buffer = Buffer.from(str, 'utf8')
    const base64encoded = buffer.toString('base64')

    dispatch(getDriverDetailsAction({ base64encoded }))
  }, [])

  useEffect(() => {
    const data = {
      tokenId: '',
      vehicleId: vehicle,
      userId: user?.userId,
      isadmin: user?.isadmin,
      companyId: user?.companyId,
      refreshduration: '30'
    }

    const str = JSON.stringify(data)
    const buffer = Buffer.from(str, 'utf8')
    const base64encoded = buffer.toString('base64')

    dispatch(getVehiclesPositionAction({ base64encoded }))
  }, [])

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: pickUpCoordinates,
      zoom: 9
    })
    map.on('load', () => {
      if (pickUpCoordinates) {
        addToMap(map, pickUpCoordinates, `<span>Pick-up point</span>`)
      }

      if (dropoffCoordinates) {
        addToMap(map, dropoffCoordinates, `<span>Drop-off point</span>`)
      }

      if (pickUpCoordinates && dropoffCoordinates) {
        map.fitBounds([pickUpCoordinates, dropoffCoordinates], {
          padding: 60
        })

        getRoute(pickUpCoordinates, dropoffCoordinates).then(route => {
          map.addLayer({
            id: 'route',
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                geometry: route
              }
            },
            paint: {
              'line-color': '#3887be',
              'line-width': 5,
              'line-opacity': 0.75
            }
          })

          // const routeLength = turf.length(route, { units: 'kilometers' })
          // const routeDuration = response.body.routes[0].duration / 60 // in minutes
          // console.log('Route length:', routeLength, 'km')
          // console.log('Route duration:', routeDuration, 'min')
        })
      }
    })
  }, [pickUpCoordinates, dropoffCoordinates])

  return (
    <div className='map-wrapper'>
      <div className='back-button-container' onClick={() => router.push('/trip-view')}>
        <Icon icon='material-symbols:arrow-back' width='40' height='30' color='#00000077' />
      </div>

      <div className='details-modal'>
        <p>
          Driver Name: {driverDetails?.data && `${driverDetails?.data[0]?.name} ${driverDetails?.data[0]?.lastname}`}
        </p>
        <p>Phone : {driverDetails?.data && `${driverDetails?.data[0]?.mobileno}`}</p>
        <p>Pickup : {pickupLocation}</p>
        <p>Dropoff : {dropOffLocation}</p>
        <p>Duration : {duration}</p>
        <p>Distance : {`${distance} kms`}</p>
        <p>Cost : ${cost}</p>
      </div>

      <Button
        className='start-trip-button'
        variant='contained'
        color='info'
        disabled
        onClick={() => console.log('get route from car location to end point')}
      >
        Start Trip
      </Button>

      <div ref={mapContainer} className='map-container'>
        {driversDetailsPending ? <FallbackSpinner /> : null}
      </div>
    </div>
  )
}

export default Home
