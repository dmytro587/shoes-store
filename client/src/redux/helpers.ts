// import { BaseThunkAPI } from '@reduxjs/toolkit'
import { AxiosResponse } from 'axios'
import { APIError, ErrorData } from '@types'

const getTypedError = (err: any) => {
   const error = err as APIError
   const response = error.response as AxiosResponse<ErrorData>

   return response.data
}

export { getTypedError }