import {
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_SUCCESS,
   SET_ERROR
} from '../actionTypes/auth'
import {
   login as loginAPI,
   registration as registrationAPI
} from './../../api/api'

const registerSuccess = {
   type: REGISTER_SUCCESS
}

const setError = error => ({
   type: SET_ERROR,
   payload: error
})

const loginSuccess = token => ({
   type: LOGIN_SUCCESS,
   payload: token
})

export const login = loginData => async dispatch => {
   try {
      const token = await loginAPI(loginData)
      localStorage.setItem('token', token)
      dispatch(loginSuccess(token))
   } catch (e) {
      console.log(e.response.data)
      dispatch(setError(e.response.data))
   }
}

export const registration = registerData => async dispatch => {
   try {
      await registrationAPI(registerData)
      dispatch(registerSuccess)
   } catch (e) {
      console.log(e.response.data)
      dispatch(setError(e.response.data))
   }
}

export const autoLogin = () => dispatch => {
   const token = localStorage.getItem('token')

   if (token) {
      dispatch(loginSuccess(token))
   }
}

export const logout = () => {
   localStorage.removeItem('token')
   return { type: LOGOUT }
}

