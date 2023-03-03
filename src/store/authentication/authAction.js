import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

// Actions
export const login = createAsyncThunk('auth/login', async ({ base64encoded, callback }, { rejectWithValue }) => {
  try {
    const res = await useJwt.login(base64encoded)
    const resData = res.data
    const driverId = resData?.data?.driverId
    console.log('res : ', resData?.data)

    if (resData?.data?.driverId) {
      useJwt.setToken(driverId)

      const user = {
        role: 'admin',
        waslPermission: resData?.data?.waslPermission,
        companyId: resData?.data?.companyId,
        emailId: resData?.data?.emailId,
        name: resData?.data?.name,
        tokenId: resData?.data?.tokenId,
        mapSetting: resData?.data?.mapSetting,
        mapSetting2: resData?.data?.mapSetting2,
        userId: resData?.data?.userId,
        username: resData?.data?.username,
        issuperadmin: resData?.data?.issuperadmin,
        isadmin: resData?.data?.isadmin,
        age: resData?.data?.age,
        mobileno: resData?.data?.mobileno,
        address: resData?.data?.address,
        photo: resData?.data?.roleId,
        roleId: resData?.data?.photo,
        zoneIds: resData?.data?.zoneIds,
        isdefaultrole: resData?.data?.driverId,
        driverId: resData?.data?.isdefaultrole,
        wholeAccess: resData?.data?.wholeAccess,
        companystatus: resData?.data?.companystatus,
        AccountExpiryDate: resData?.data?.AccountExpiryDate,
        logo: resData?.data?.logo,
        userType: resData?.data?.userType,
        adminType: resData?.data?.adminType,
        tsr: resData?.data?.tsr
      }

      useJwt.setUserData(user)

      callback()
    }

    return resData
  } catch (err) {
    return rejectWithValue(err?.response?.data.message || err.message)
  }
})
