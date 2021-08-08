import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { APIError } from '@types'
import { setGlobalError } from '@redux/slices/app'
import store from '@redux/store'


const instance = axios.create({
   baseURL: 'http://localhost:5000/api/'
})

export async function request<T>(config: AxiosRequestConfig): Promise<T> {
   return instance(config).then(response => response.data)
}

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
   const token = localStorage.getItem('token')
   config.headers.Authorization = token ? `Bearer ${ token }` : ''

   return config
})

instance.interceptors.response.use(function (response: AxiosResponse) {
   return response
}, function (error: AxiosError): Promise<APIError> {

   if (error.response?.status === 503) {
      store.dispatch(setGlobalError({
         message: 'Сервер не доступен, попробуйте позже'
      }))
   }

   if (!error.response) {
      return Promise.reject({
         response: {
            status: 503,
            message: 'Сервер временно не доступен'
         }
      })
   }

   return Promise.reject(error)
})

