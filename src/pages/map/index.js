/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

import { useRouter } from 'next/router'

// ** Third Party Components
import moment from 'moment'
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

  console.log('vehiclePosition : ', vehiclePosition)

  const { pickup, dropoff, pickupLocation, dropOffLocation, cost, vehicle } = router.query

  const [carPos, setCarPos] = useState(null)
  const [mapData, setMapData] = useState(null)
  const [hours, setHours] = useState(null)
  const [minutes, setMinutes] = useState(null)
  const [tripStart, setTripStart] = useState(false)
  const [intervalId, setIntervalId] = useState(null)

  const pickUpCoordinates = pickup && [pickup.split(',')[0], pickup.split(',')[1]]
  const dropoffCoordinates = dropoff && [dropoff.split(',')[0], pickup.split(',')[1]]

  // ** Marker Function
  const addToMap = (map, coordinates, popupContent, isCar = false) => {
    if (isCar) {
      const markerElement = document.createElement('div')
      markerElement.className = isCar && 'car-marker'
      const imgElement = document.createElement('img')
      imgElement.src = '/images/car-icon.png' // replace with your car image URL
      markerElement.appendChild(imgElement)

      const marker = new mapboxgl.Marker({
        element: markerElement
      })
        .setLngLat(coordinates)
        .addTo(map)
    } else {
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
  }

  // ** Route function
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

  // ** Map Data
  const getMapData = (start, end) => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${parseFloat(start[0])},${start[1]};${end[0]},${
        end[1]
      }?annotations=maxspeed&overview=full&geometries=geojson&` +
        new URLSearchParams({
          access_token:
            'pk.eyJ1IjoiaGFyaXN0cmFja2luZyIsImEiOiJjbGVneWQ3anowanJvM3ZsZDdiNTB2aGk2In0.-YLuxE0bmfGbf8x3GH3n7A'
        })
    )
      .then(response => {
        return response.json()
      })
      .then(data => {
        setMapData(data)
        const duration = moment.duration(data?.routes[0].duration, 'seconds')
        setHours(duration.hours())
        setMinutes(duration.minutes())
      })
  }

  // ** Driver Details
  useEffect(() => {
    const data = { driver_id: user?.driverId }
    const str = JSON.stringify(data)
    const buffer = Buffer.from(str, 'utf8')
    const base64encoded = buffer.toString('base64')

    dispatch(getDriverDetailsAction({ base64encoded }))
  }, [])

  // ** Vehicle Position
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

    dispatch(
      getVehiclesPositionAction({
        base64encoded,
        callback: res => {
          // setCarPos([parseFloat(res?.longitude), parseFloat(res?.latitude)])
          // getMapData([parseFloat(res?.longitude), parseFloat(res?.latitude)], pickUpCoordinates)

          if (!tripStart) {
            setCarPos([74.3159979, 31.4961879]) // near pickup
            getMapData([74.3159979, 31.4961879], pickUpCoordinates) // near pickup to pickup
          }

          if (tripStart) {
            setCarPos([74.3182677253, 31.4972652933]) // near dropoff
            getMapData([74.3182677253, 31.4972652933], pickUpCoordinates) // near dropoff
          }
        }
      })
    )
  }, [tripStart])

  console.log('tripStart: ', tripStart, 'mapData : ', mapData)
  console.log('car Position : ', carPos)

  useEffect(() => {
    if (carPos) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: carPos,
        zoom: 9
      })

      map.on('load', () => {
        addToMap(map, carPos, '<p>Car Position</p>', true)

        if (pickUpCoordinates && !tripStart) {
          addToMap(map, pickUpCoordinates, `<span>Pick-up point</span>`)
        }

        if (dropoffCoordinates && tripStart) {
          addToMap(map, dropoffCoordinates, `<span>Drop-off point</span>`)
        }

        if (pickUpCoordinates && carPos && !tripStart) {
          map.fitBounds([carPos, pickUpCoordinates], {
            padding: 60
          })

          getRoute(carPos, pickUpCoordinates).then(route => {
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
          })
        }

        if (dropoffCoordinates && carPos && tripStart) {
          map.fitBounds([carPos, dropoffCoordinates], {
            padding: 60
          })

          getRoute(carPos, dropoffCoordinates).then(route => {
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
          })
        }

        // if (pickUpCoordinates && dropoffCoordinates) {
        //   map.fitBounds([pickUpCoordinates, dropoffCoordinates], {
        //     padding: 60
        //   })

        //   getRoute(pickUpCoordinates, dropoffCoordinates).then(route => {
        //     map.addLayer({
        //       id: 'route',
        //       type: 'line',
        //       source: {
        //         type: 'geojson',
        //         data: {
        //           type: 'Feature',
        //           geometry: route
        //         }
        //       },
        //       paint: {
        //         'line-color': '#3887be',
        //         'line-width': 5,
        //         'line-opacity': 0.75
        //       }
        //     })

        //     // const routeLength = turf.length(route, { units: 'kilometers' })
        //     // const routeDuration = response.body.routes[0].duration / 60 // in minutes
        //     // console.log('Route length:', routeLength, 'km')
        //     // console.log('Route duration:', routeDuration, 'min')
        //   })
        // }
      })
    }
  }, [pickUpCoordinates, dropoffCoordinates, tripStart])

  // useEffect(() => {
  //   return () => {
  //     dispatch(resetDriverDetails())
  //     dispatch(resetVehiclePosition())
  //   }
  // }, [])

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
        <p>Duration : {hours > 0 ? `${hours} Hours ${minutes} minutes` : `${minutes} minutes`}</p>
        <p>
          Distance :{' '}
          {mapData?.routes[0].distance > 1000
            ? `${(mapData?.routes[0].distance / 1000).toFixed(1)} kms`
            : `${(mapData?.routes[0].distance).toFixed(2)} m`}
        </p>
        <p>Cost : ${cost}</p>
      </div>
      {!tripStart && (
        <Button
          className='start-trip-button'
          variant='contained'
          color='info'
          disabled={mapData?.routes[0].distance > 100}
          onClick={() => {
            setCarPos([74.3182677253, 31.4972652933]) // near dropoff
            setTripStart(true)
          }}
        >
          Start Trip
        </Button>
      )}

      {tripStart && (
        <Button
          className='start-trip-button'
          variant='contained'
          color='success'
          disabled={mapData?.routes[0].distance > 400}
          onClick={() => {
            router.push('/trip-complete')
          }}
        >
          Complete
        </Button>
      )}

      <div ref={mapContainer} className='map-container'>
        {driversDetailsPending ? <FallbackSpinner /> : null}
      </div>
    </div>
  )
}

export default Home
