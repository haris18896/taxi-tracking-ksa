import { createSlice } from '@reduxjs/toolkit'
import { login } from './authAction'

// Reducers
export const AuthReducer = createSlice({
  name: 'auth',
  initialState: {
    loginInProgress: false,
    user: {}
  },
  reducers: {
    handleLogout: state => {
      state.user = {}
      localStorage.clear()
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loginInProgress = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginInProgress = false
        state.errors = null
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.loginInProgress = false
        state.errors = action.payload
        state.user = null
      })
  }
})

export const { handleLogout } = AuthReducer.actions

export default AuthReducer.reducer
