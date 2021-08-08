import { request } from './APIUtils'
import {
   JustMessage,
   UserData,
   LoginResponse,
   NewPasswordData,
   RegistrationData,
} from '../types'


const authAPI = {
   autoLogin() {
      return request<JustMessage>({
         method: 'GET',
         url: 'auth/check-auth'
      })
   },

   async login(userData: UserData) {
      const response = await request<LoginResponse>({
         method: 'POST',
         url: 'auth/login',
         data: { ...userData }
      })

      return response.token
   },

   async registration(registrationData: RegistrationData) {
      return await request<JustMessage>({
         method: 'POST',
         url: 'auth/registration',
         data: { ...registrationData }
      })
   },

   async resetPassword(email: string) {
      return await request<JustMessage>({
         method: 'POST',
         url: 'auth/reset-password',
         data: { email }
      })
   },

   async newPassword(data: NewPasswordData) {
      return await request<JustMessage>({
         method: 'POST',
         url: 'auth/new-password',
         data: { ...data }
      })
   },

   checkAccess() {
      return request<JustMessage>({
         method: 'GET',
         url: 'auth/check-access'
      })
   }
}

export default authAPI