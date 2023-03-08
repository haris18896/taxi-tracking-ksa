import React from 'react'

// ** MUI
import { Box } from '@mui/system'
import { Checkbox, FormControlLabel, Grid, Typography } from '@mui/material'

// ** Components
import { FieldWrapper, TextLabel, TextInput, FieldHorizontalWrapper } from 'src/styles/input'

function TripComplete() {
  return (
    <>
      <Box sx={{ backgroundColor: '#3a3c54', height: '300px' }}>
        <Typography variant='body' sx={{ padding: '8px 5px' }}>
          Client Signature
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <FieldWrapper>
            <TextLabel id='name' sx={{ marginBottom: '0.25rem' }}>
              Name
            </TextLabel>
            <TextInput
              fullWidth
              max={10}
              id='name'
              name='name'
              type='text'
              variant='outlined'
              placeholder='Enter Client Name'
            />
          </FieldWrapper>
        </Grid>

        <Grid item xs={12} md={6}>
          <FieldWrapper>
            <TextLabel id='comment' sx={{ marginBottom: '0.25rem' }}>
              Comment
            </TextLabel>
            <TextInput
              fullWidth
              max={10}
              id='comment'
              name='comment'
              type='text'
              variant='outlined'
              placeholder='Comment ...'
            />
          </FieldWrapper>
        </Grid>

        <Grid item xs={12} md={6}>
          <FieldWrapper>
            <TextLabel id='contact' sx={{ marginBottom: '0.25rem' }}>
              Contact Number
            </TextLabel>
            <TextInput
              fullWidth
              max={10}
              id='contact'
              name='contact'
              type='text'
              variant='outlined'
              placeholder='Phone Number'
            />
          </FieldWrapper>
        </Grid>

        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <FieldHorizontalWrapper sx={{ width: '-webkit-fill-available' }}>
            <FormControlLabel
              control={
                <Checkbox id='cash' name='cash' type='checkbox' sx={{ padding: 0, marginRight: 3 }} checked={true} />
              }
              label='Cash'
            />

            <FormControlLabel
              control={
                <Checkbox
                  id='billToCompany'
                  name='billToCompany'
                  type='checkbox'
                  sx={{ padding: 0, marginRight: 3 }}
                  checked={false}
                />
              }
              label='Bill To Company'
            />
          </FieldHorizontalWrapper>
        </Grid>
      </Grid>
    </>
  )
}

export default TripComplete
