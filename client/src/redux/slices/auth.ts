import { createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'

import { AppDispatch, RootState } from '../store'
import { APIError, ErrorData, NewPasswordData, RegistrationData, UserData } from '@types'

import { delay, history } from '@utils'
import { authAPI } from '@services'
import { setAlert } from './alert'

export const login = createAsyncThunk<string, UserData, { dispatch: AppDispatch }>(
   'auth/login',
   async (loginData, { dispatch, rejectWithValue }) => {
      try {
         const token = await authAPI.login(loginData)

         localStorage.setItem('token', token)

         return token
      } catch (err) {
         console.warn(err)
         dispatch(setAlert(err.response.data.message, 'error'))

         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
      }
   }
)

export const autoLogin = createAsyncThunk<string | null, void>(
   'auth/autoLogin',
   // @ts-ignore
   async (_, { rejectWithValue }) => {
      const token = localStorage.getItem('token')

      try {
         if (token) {
            await authAPI.autoLogin()
            return token
         }

         return null
      } catch (err) {
         console.warn(err)
         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
      }
   }
)

export const checkAccess = createAsyncThunk<void, void, { dispatch: AppDispatch }>(
   'auth/checkAccess',
   async (_, { dispatch, rejectWithValue }) => {
      try {
         await delay()
         await authAPI.checkAccess()
      } catch (err) {
         console.warn(err)
         dispatch(setAlert(err.response.data.message, 'error'))

         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
      }
   }
)

export const registration = createAsyncThunk<void, RegistrationData, { dispatch: AppDispatch  }>(
   'auth/registration',
   async (registerData, { dispatch, rejectWithValue }) => {
      try {
         await authAPI.registration(registerData)
      } catch (err) {
         console.warn(err)
         dispatch(setAlert(err.response.data.message, 'error'))

         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
      }
   }
)

export const resetPassword = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
   'auth/resetPassword',
   async (email, { dispatch, rejectWithValue }) => {
      try {
         const { message } = await authAPI.resetPassword(email)

         dispatch(setAlert(message))
      } catch (err) {
         console.warn(err)
         dispatch(setAlert(err.response.data.message, 'error'))

         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
      }
   }
)

export const newPassword = createAsyncThunk<void, NewPasswordData, { dispatch: AppDispatch }>(
   'auth/newPassword',
   async (data, { dispatch, rejectWithValue }) => {
      try {
         const { message } = await authAPI.newPassword(data)

         dispatch(setAlert(message))
         history.push('/auth/login')
      } catch (err) {
         console.warn(err)
         dispatch(setAlert(err.response.data.message, 'error'))

         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
      }
   }
)

// slice
const initialState = {
   token: null                as string | null,
   isRegistered: false        as boolean, // TODO: rename to registrationFulfilled || registrationSuccess
   isAuthed: false            as boolean,
   error: null                as ErrorData | null,
   isAccessChecking: false    as boolean
}

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.token = null
         state.isAuthed = false

         localStorage.removeItem('token')
         history.push('/home')
      }
   },
   extraReducers: builder => {
      builder.addCase(login.fulfilled, (state, action) => {
         state.token = action.payload
         state.isAuthed = true
      })

      builder
         .addCase(autoLogin.fulfilled, (state, action) => {
            state.token = action.payload
            state.isAuthed = true
         })
         .addCase(autoLogin.rejected, (state) => {
            state.token = null
            state.isAuthed = false
            state.error = null
         })

      builder
         .addCase(checkAccess.pending, state => {
            state.isAccessChecking = true
         })
         .addCase(checkAccess.fulfilled, state => {
            state.isAccessChecking = false
         })
         .addCase(checkAccess.rejected, (state, action) => {
            // state.error = action.payload or action.error
            state.isAccessChecking = false
         })

      builder
         .addCase(registration.fulfilled, state => {
            state.isRegistered = true
            state.error = null
         })
   }
})

// export function autoLogin(): ThunkFn {
//    return async dispatch => {
//       const token = localStorage.getItem('token')
//       debugger
//       try {
//          if (token) {
//             await authAPI.autoLogin()
//             dispatch(autoLoginSuccess(token))
//          }
//
//          dispatch(autoLoginFailed())
//       } catch (err) {
//          console.warn(err)
//          dispatch(autoLoginFailed)
//       }
//    }
// }

export const { logout } = authSlice.actions

export const selectIsAuthed = (state: RootState) => state.auth.isAuthed
export const selectIsRegistered = (state: RootState) => state.auth.isRegistered
export const selectAuthError = (state: RootState) => state.auth.error
export const selectIsAccessChecking = (state: RootState) => state.auth.isAccessChecking

export default authSlice.reducer

