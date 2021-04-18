import { instance, getHeadersWithAuth } from './api'

const authAPI = {
   autoLogin() {
      return instance.get('auth/check-auth', getHeadersWithAuth())
   },

   async login({ username, email, password }) {
      const response = await instance.post('auth/login', {
         username,
         email,
         password
      })

      return response.data.token
   },

   async registration({ username, email, password, confirm }) {
      const response = await instance.post('auth/registration', {
         username,
         email,
         password,
         confirm
      })

      return response.data
   }
}

export default authAPI