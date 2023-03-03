import React, { useState, useEffect } from 'react'

// ** useJwt
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import { Button, Checkbox, CircularProgress, FormControlLabel, Icon } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Components
import TripViewHeader from 'src/views/trip-view/trip-view-header'
import TripViewTable from 'src/views/trip-view/trip-view-table'

// ** Store && Actions
import { useDispatch, useSelector } from 'react-redux'
import { getAllVehiclesActions, getVehicleTripsAction } from 'src/store/vehicles/vehiclesAction'
import { Box } from '@mui/system'
import FallbackSpinner from 'src/@core/components/spinner'

function TripListing() {
  const dispatch = useDispatch()
  const user = useJwt.getUserData()

  const [vehicleId, setVehicleId] = useState('')
  const [open, setOpen] = useState(true)

  const { vehiclesListPending, vehiclesList, tripsListPending, tripsList } = useSelector(state => state.vehicle)

  const handleClose = () => setOpen(false)

  const handleOpen = id => {
    setOpen(true)
    console.log('id : ', id)
  }

  const handleLimit = () => {}
  const handlePagination = () => {}

  useEffect(() => {
    if (user?.driverId) {
      const data = { driverId: user?.driverId }
      const str = JSON.stringify(data)
      const buffer = Buffer.from(str, 'utf8')
      const base64encoded = buffer.toString('base64')

      dispatch(getAllVehiclesActions({ base64encoded }))
    }
  }, [user?.driverId, dispatch])

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby='add-trip'>
        <DialogTitle id='add-trip'>Vehicles</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>Select Vehicle to get trips.</DialogContentText>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexWrap: 'wrap'
            }}
          >
            {vehiclesListPending ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '300px',
                  minHeight: '40vh'
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              vehiclesList.map((item, index) => (
                <Box key={index} sx={{ width: '50%' }}>
                  {/* // checkboxes */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        name={item.vehicleName}
                        color='primary'
                        sx={{ mx: 0.5 }}
                        onChange={e => {
                          if (e.target.checked) {
                            setVehicleId(item.vehicleId)
                          }
                        }}
                        checked={item.vehicleId === vehicleId}
                      />
                    }
                    label={item.vehicleName}
                  />
                </Box>
              ))
            )}
          </Box>
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant='extended' color='error' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='extended'
            color='success'
            type='submit'
            disabled={!vehicleId}
            onClick={() => {
              if (vehicleId) {
                const data = { vehicle_id: vehicleId }
                const str = JSON.stringify(data)
                const buffer = Buffer.from(str, 'utf8')
                const base64encoded = buffer.toString('base64')

                dispatch(getVehicleTripsAction({ base64encoded, callback: () => setOpen(false) }))
              }
            }}
          >
            Select Vehicle
          </Button>
        </DialogActions>
      </Dialog>

      <TripViewHeader vehicleModal={() => handleOpen(user.driverId)} />

      <TripViewTable loading={tripsListPending} rows={tripsList} />
    </>
  )
}

export default TripListing
