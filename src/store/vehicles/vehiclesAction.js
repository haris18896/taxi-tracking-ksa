import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

export const getAllVehiclesActions = createAsyncThunk(
  'vehicles/getAllVehicles',
  async ({ base64encoded }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getVehicles(base64encoded)
      console.log('res of vehicles : ', base64encoded, res)

      return res?.data
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const getDriverDetailsAction = createAsyncThunk(
  'vehicles/getDriverDetails',
  async ({ base64encoded }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getDriverDetails(base64encoded)

      console.log('res of driver details : ', base64encoded, res)

      return res?.data
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const getVehicleTripsAction = createAsyncThunk(
  'vehicles/getVehicleTrips',
  async ({ base64encoded, callback }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getVehicleTrips(base64encoded)

      console.log('res of trips: ', base64encoded, res?.data?.data)

      callback()

      return res?.data
    } catch (err) {
      return rejectWithValue(err?.response?.data.message || err.message)
    }
  }
)

export const updateTripDataAction = createAsyncThunk(
  'vehicles/updateTripData',
  async ({ base64encoded }, { rejectWithValue }) => {
    try {
      const res = await useJwt.updateTripData(base64encoded)

      return res?.data
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message)
    }
  }
)

export const getVehiclesPositionAction = createAsyncThunk(
  'vehicles/getVehiclesPosition',
  async ({ base64encoded }, { rejectWithValue }) => {
    try {
      const res = await useJwt.getVehiclesPosition(base64encoded)

      return res?.data
    } catch (err) {
      return rejectWithValue(err?.response?.data || err.message)
    }
  }
)
