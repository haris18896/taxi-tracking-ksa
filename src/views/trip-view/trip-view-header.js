import React, { useState } from 'react'

// ** MUI
import Grid from '@mui/material/Grid'
import { Button, Icon } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

// ** Third Party Imports
import * as Yup from 'yup'
import { useFormik } from 'formik'

// ** Store & Actions
// import { useDispatch } from 'react-redux'

// ** Styles
import { TextInput, TextLabel, Title } from 'src/styles/input'

function TripViewHeader({ vehicleModal }) {
  //   const dispatch = useDispatch()

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Title>Trips List</Title>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={9}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <Grid container spacing={1} sx={{ justifyContent: 'flex-end' }}>
            <Grid item xs={12} sm={6} md={3} lg={2}>
              <Button variant='extended' color='success' onClick={vehicleModal}>
                Select Vehicle
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default TripViewHeader
