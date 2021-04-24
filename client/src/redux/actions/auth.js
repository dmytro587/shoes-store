import {
   CLEAR_ALERT,
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_SUCCESS,
   SET_ALERT,
   SET_ERROR
} from '../actionTypes/auth'
import { checkAndSetAppError } from './app'
import { authAPI } from '../../api'
import { history } from './../../utils'

const registerSuccess = {
   type: REGISTER_SUCCESS
}

const clearAlert = {
   type: CLEAR_ALERT
}

const setError = error => ({
   type: SET_ERROR,
   payload: error
})

const loginSuccess = token => ({
   type: LOGIN_SUCCESS,
   payload: token
})

export const logout = () => {
   localStorage.removeItem('token')
   return { type: LOGOUT }
}

export const setAlert = (msg, timeout = 10000) => dispatch => {
   dispatch({
      type: SET_ALERT,
      payload: msg
   })

   setTimeout(() => {
      dispatch(clearAlert)
   }, timeout)
}

export const login = loginData => async dispatch => {
   try {
      const token = await authAPI.login(loginData)
      localStorage.setItem('token', token)
      dispatch(loginSuccess(token))
   } catch (e) {
      console.log(e)
      dispatch(checkAndSetAppError(e))
      dispatch(setError(e.response.data))
   }
}

export const autoLogin = () => async dispatch => {
   const token = localStorage.getItem('token')

   try {
      if (token) {
         await authAPI.autoLogin()
         dispatch(loginSuccess(token))
      }
   } catch (e) {
      dispatch(logout())
      dispatch(checkAndSetAppError(e))
   }
}

export const registration = registerData => async dispatch => {
   try {
      await authAPI.registration(registerData)
      dispatch(registerSuccess)
   } catch (e) {
      console.log(e)
      dispatch(checkAndSetAppError(e))
      dispatch(setError(e.response.data))
   }
}

export const resetPassword = email => async dispatch => {
   try {
      const { message } = await authAPI.resetPassword(email)
      dispatch(setAlert(message))
   } catch (e) {
      console.log(e)
      dispatch(checkAndSetAppError(e))
      dispatch(setError(e.response.data))
   }
}

export const newPassword = (password, confirm, token) => async dispatch => {
   try {
      const { message } = await authAPI.newPassword(password, confirm, token)
      dispatch(setAlert(message))
      history.push('/auth/login')
   } catch (e) {
      console.log(e)
      dispatch(checkAndSetAppError(e))
      dispatch(setError(e.response.data))
   }
}
