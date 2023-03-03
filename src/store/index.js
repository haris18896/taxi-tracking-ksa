// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import AuthReducer from './authentication/authSlice'


export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutabilityCheck: false
    })
})
