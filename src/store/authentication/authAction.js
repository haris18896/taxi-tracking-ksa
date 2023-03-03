import { createAsyncThunk } from '@reduxjs/toolkit'
import useJwt from 'src/auth/jwt/useJwt'

// Actions
export const login = createAsyncThunk('auth/login', async ({ data, router }, { rejectWithValue }) => {
  try {
    const res = await useJwt.login(data)
    const resData = res.data
    const driverId = resData?.driverId

    if (driverId) {
      const returnUrl = router.query.returnUrl
      useJwt.setToken(driverId)

      const user = {
        role: 'admin',
        waslPermission: resData.waslPermission,
        companyId: resData.companyId,
        emailId: resData.emailId,
        name: resData.name,
        tokenId: resData.tokenId,
        mapSetting: resData.mapSetting,
        mapSetting2: resData.mapSetting2,
        userId: resData.userId,
        username: resData.username,
        issuperadmin: resData.issuperadmin,
        isadmin: resData.isadmin,
        age: resData.age,
        mobileno: resData.mobileno,
        address: resData.address,
        photo: resData.roleId,
        roleId: resData.photo,
        zoneIds: resData.zoneIds,
        isdefaultrole: resData.driverId,
        driverId: resData.isdefaultrole,
        wholeAccess: resData.wholeAccess,
        companystatus: resData.companystatus,
        AccountExpiryDate: resData.AccountExpiryDate,
        logo: resData.logo,
        userType: resData.userType,
        adminType: resData.adminType,
        tsr: resData.tsr
      }

      useJwt.setUserData(user)

      const redirectURL = returnUrl && returnUrl !== '/dashboard' ? returnUrl : '/dashboard'
      router.replace(redirectURL)
    }

    console.log('Authentication response : ', resData)

    return resData
  } catch (err) {
    return rejectWithValue(err?.response?.data.message || err.message)
  }
})
