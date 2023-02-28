import { makeStyles } from '@mui/styles'
import { styled } from '@mui/material/styles'

import { Box, TextField, Select, InputLabel, Typography } from '@mui/material'

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.4rem',
  color: theme.palette.text.primary,
  letterSpacing: '0.18px'
}))

export const FieldWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1)
}))

export const FieldHorizontalWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  marginBottom: theme.spacing(2),
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1)
}))

export const TextInput = styled(TextField)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '1rem',

  '& .MuiOutlinedInput-root': {
    borderRadius: '5rem'
  },

  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(2, 3)
  }
}))

export const SelectInput = styled(Select)(({ theme }) => ({
  borderRadius: '5rem',

  '& .MuiOutlinedInput-input': {
    padding: theme.spacing(2, 3),
    borderRadius: '5rem'
  }
}))

export const TextLabel = styled(InputLabel)(({ theme }) => ({
  fontWeight: 500,
  marginBottom: theme.spacing(1),
  marginTop: theme.spacing(1)
}))

export const HeaderLabel = styled('span')(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.2rem',
  paddingBottom: theme.spacing(2),
  border: `3px solid ${theme.palette.primary.main}`,
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  color: theme.palette.primary.main
}))

export const StatsWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: '-webkit-fill-available'
}))
