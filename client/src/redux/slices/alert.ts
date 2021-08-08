import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState, ThunkFn } from '../store'
import { AxiosError } from 'axios'

import { delay } from '../../utils'

type AlertPayload = typeof initialState

const initialState = {
   message: null  as string | null,
   type: null     as string | null
}

export const alertSlice = createSlice({
   name: 'alert',
   initialState,
   reducers: {
      setAlertData: (state, action: PayloadAction<AlertPayload>) => {
         state.message = action.payload.message
         state.type = action.payload.type
      },
      removeAlert: state => {
         state.message = null
         state.type = null
      }
   }
})

export const setAlert = (
   error: string | AxiosError,
   type: string = 'success',
   timeout: number = 10000
): ThunkFn =>
   dispatch => {
      if (typeof error === 'object') {
         const message = error.response?.data?.message

         dispatch(setAlertData({ message, type: type }))
      } else {
         dispatch(setAlertData({ message: error, type }))
      }

      delay(timeout).then(() => dispatch(removeAlert))
   }

export const { setAlertData, removeAlert } = alertSlice.actions

export const selectAlert = (state: RootState) => state.alert

export default alertSlice.reducer