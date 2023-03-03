import React, { useState } from 'react'

// ** useJwt
import useJwt from 'src/auth/jwt/useJwt'

// ** MUI
import { Button, Icon } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Components
import TripViewHeader from 'src/views/trip-view/trip-view-header'
import TripViewTable from 'src/views/trip-view/trip-view-table'

function TripListing() {
  const user = useJwt.getUserData()
  const [open, setOpen] = useState(true)

  const handleClose = () => setOpen(false)

  const handleOpen = (id) => {
    setOpen(true)
    console.log('id : ', id)
  }

  const handleLimit = () => {}
  const handlePagination = () => {}

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby='add-trip'>
        <DialogTitle id='add-trip'>Vehicles</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>Select Vehicle to get trips.</DialogContentText>
          form goes here
        </DialogContent>
        <DialogActions className='dialog-actions-dense'>
          <Button variant='extended' color='error' onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant='extended'
            color='success'
            type='submit'

            // onClick={() => dispatch()}
          >
            Select Vehicle
          </Button>
        </DialogActions>
      </Dialog>

      <TripViewHeader vehicleModal={() => handleOpen(user.driverId)} />
      <TripViewTable
        page={1}
        limit={10}
        total={10}
        handleLimitChange={handleLimit}
        handlePageChange={handlePagination}
      />
    </>
  )
}

export default TripListing
