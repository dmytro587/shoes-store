import {
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_SUCCESS,
   SET_ALERT,
   SET_ERROR
} from '../actionTypes/auth'
import { authAPI } from '../../api'

const registerSuccess = {
   type: REGISTER_SUCCESS
}

const setAlert = msg => ({
   type: SET_ALERT,
   payload: msg
})

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
      const token = await authAPI.login(loginData)
      localStorage.setItem('token', token)
      dispatch(loginSuccess(token))
   } catch (e) {
      console.log(e)
      dispatch(setError(e.response.data))
   }
}

export const autoLogin = () => async dispatch => {
   const token = localStorage.getItem('token')

   try {
      await authAPI.autoLogin()
      dispatch(loginSuccess(token))
   } catch (e) {
      console.log(e)
   }
}

export const registration = registerData => async dispatch => {
   try {
      await authAPI.registration(registerData)
      dispatch(registerSuccess)
   } catch (e) {
      console.log(e)
      dispatch(setError(e.response.data))
   }
}

export const logout = () => {
   localStorage.removeItem('token')
   return { type: LOGOUT }
}

export const resetPassword = email => async dispatch => {
   try {
      const { message } = await authAPI.resetPassword(email)
      dispatch(setAlert(message))
   } catch (e) {
      console.log(e)
      dispatch(setError(e.response.data))
   }
}

export const newPassword = (password, confirm, token) => async dispatch => {
   try {
      const { message } = await authAPI.newPassword(password, confirm, token)
      dispatch(setAlert(message))
   } catch (e) {
      console.log(e)
      dispatch(setError(e.response.data))
   }
}
