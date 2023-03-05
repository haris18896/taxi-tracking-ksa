import React, { useState, useEffect } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'

import { useRouter } from 'next/router'

// ** Third Party Components
import { Icon } from '@iconify/react'

// ** hooks
import useJwt from 'src/auth/jwt/useJwt'

// ** Components
import Map from 'src/views/map'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { getDriverDetailsAction, getVehiclesPositionAction } from 'src/store/vehicles/vehiclesAction'
import FallbackSpinner from 'src/@core/components/spinner'
import { resetDriverDetails, resetVehiclePosition } from 'src/store/vehicles/vehiclesSlice'

const Home = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const user = useJwt.getUserData()
  const { driversDetailsPending, driverDetails, vehiclePosition } = useSelector(state => state.vehicle)

  const { pickup, dropoff, pickupLocation, dropOffLocation, duration, distance, cost, vehicle } = router.query

  const [intervalId, setIntervalId] = useState(null)
  const [center, setCenter] = useState({ latitude: null, longitude: null })

  const pickUpCoordinates = pickup && [pickup.split(',')[0], pickup.split(',')[1]]
  const dropoffCoordinates = dropoff && [dropoff.split(',')[0], pickup.split(',')[1]]

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

  if (driversDetailsPending) {
    return <FallbackSpinner />
  }

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
      <Map
        vehiclePosition={vehiclePosition}
        center={center}
        pickUpCoordinates={pickUpCoordinates}
        dropoffCoordinates={dropoffCoordinates}
      />
    </div>
  )
}

export default Home
