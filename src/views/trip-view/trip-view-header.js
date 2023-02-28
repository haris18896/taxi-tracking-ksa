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

function TripViewHeader({}) {
  //   const dispatch = useDispatch()

  // ** State
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const schema = Yup.object().shape({})

  const formik = useFormik({
    initialValues: {},
    validationSchema: schema,
    onSubmit: (values, { resetForm }) => {
      const data = {}
      console.log('data : ', data)
      resetForm()
      handleClose()
    }
  })

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
              <Button variant='extended' color='success' onClick={handleClickOpen}>
                Add Trip
              </Button>
            </Grid>
          </Grid>

          <Dialog open={open} onClose={handleClose} aria-labelledby='add-trip'>
            <DialogTitle id='add-trip'>Add Trip</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ mb: 3 }}>Enter trip data to start your trip.</DialogContentText>
              {/* <form name='add-permissions' onSubmit={formik.handleSubmit}>
                <div>
                  <TextLabel id='permission-name'>Permission Name</TextLabel>
                  <TextInput
                    id='name'
                    autoFocus
                    fullWidth
                    type='text'
                    placeholder='Enter permission name'
                    value={formik.values.name}
                    {...formik.getFieldProps('name')}
                  />
                </div>

                <div>
                  <TextLabel id='permission-name'>Group Name</TextLabel>
                  <TextInput
                    id='group'
                    fullWidth
                    type='text'
                    placeholder='Enter group name'
                    value={formik.values.group}
                    {...formik.getFieldProps('group')}
                  />
                </div>
              </form> */}
            </DialogContent>
            <DialogActions className='dialog-actions-dense'>
              <Button variant='extended' color='error' onClick={handleClose}>
                Cancel
              </Button>
              <Button variant='extended' color='success' type='submit' onClick={formik.handleSubmit}>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  )
}

export default TripViewHeader
