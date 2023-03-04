import { Button, Checkbox, CircularProgress, FormControlLabel } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import FallbackSpinner from 'src/@core/components/spinner'

function VehiclesList({ loading, data, onChangeHandler, vehicle }) {
  return (
    <>
      {loading ? (
        <FallbackSpinner />
      ) : (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexWrap: 'wrap'
          }}
        >
          {data.map((item, index) => (
            <Box key={index} sx={{ width: '25%' }}>
              {/* // checkboxes */}
              <FormControlLabel
                control={
                  <Checkbox
                    name={item.vehicleName}
                    color='info'
                    sx={{ mx: 0.5 }}
                    onChange={e => {
                      if (e.target.checked) {
                        onChangeHandler('vehicleId', item.vehicleId)
                      } else {
                        onChangeHandler('vehicleId', '')
                      }
                    }}
                  />
                }
                label={item.vehicleName}
              />
            </Box>
          ))}
          <Button color='info' disabled={!vehicle} onClick={() => onChangeHandler('show', 'tripsList')}>
            Select Vehicle
          </Button>
        </Box>
      )}
    </>
  )
}

export default VehiclesList
