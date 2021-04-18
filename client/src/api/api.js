import axios from 'axios'

export const instance = axios.create({
   baseURL: 'http://localhost:5000/api/'
})

export const getHeadersWithAuth = () => {
   const config = {}
   const token = localStorage.getItem('token')

   if (token) {
      config.headers = {}
      config.headers['Authorization'] = 'Bearer ' + token
   }

   return config
}

