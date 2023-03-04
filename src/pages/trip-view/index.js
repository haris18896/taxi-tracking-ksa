import React, { useState, useEffect } from 'react'

// ** useJwt
import useJwt from 'src/auth/jwt/useJwt'

// ** Components
import TripViewTable from 'src/views/trip-view/trip-view-table'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllVehiclesActions, getVehicleTripsAction } from 'src/store/vehicles/vehiclesAction'
import VehiclesList from 'src/views/trip-view/vehiclesList'
import { Title } from 'src/styles/input'

function TripListing() {
  const dispatch = useDispatch()
  const user = useJwt.getUserData()

  const [vehicleId, setVehicleId] = useState('')
  const [show, setShow] = useState('vehiclesList')

  const { vehiclesListPending, vehiclesList, tripsListPending, tripsList } = useSelector(state => state.vehicle)

  const onChangeHandler = (name, value) => {
    if (name === 'vehicleId') setVehicleId(value)
    if (name === 'show') setShow(value)
  }

  useEffect(() => {
    if (user?.driverId) {
      const data = { driver_id: user?.driverId }
      const str = JSON.stringify(data)
      const buffer = Buffer.from(str, 'utf8')
      const base64encoded = buffer.toString('base64')

      dispatch(getAllVehiclesActions({ base64encoded }))
    }
  }, [user?.driverId, dispatch])

  console.log('vehicleId', vehicleId)

  return (
    <>
      {show === 'vehiclesList' ? (
        <VehiclesList
          vehicle={vehicleId}
          data={vehiclesList}
          loading={vehiclesListPending}
          onChangeHandler={onChangeHandler}
        />
      ) : show === 'tripsList' ? (
        <>
          <Title>Trips List</Title>
          <TripViewTable loading={tripsListPending} rows={tripsList} />
        </>
      ) : null}
    </>
  )
}

export default TripListing
