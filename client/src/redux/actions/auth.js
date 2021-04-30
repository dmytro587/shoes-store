import {
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_SUCCESS,
   SET_ERROR,
   SET_IS_CHECKED
} from '../actionTypes/auth'
import { checkAndSetAppError } from './app'
import { authAPI } from '../../api'
import { delay, history } from './../../utils'
import { setAlert } from './alert'

const registerSuccess = {
   type: REGISTER_SUCCESS
}

const loginSuccess = token => ({
   type: LOGIN_SUCCESS,
   payload: token
})

const setError = error => ({
   type: SET_ERROR,
   payload: error
})


const setIsChecked = bool => ({
   type: SET_IS_CHECKED,
   payload: bool
})

export const logout = () => {
   localStorage.removeItem('token')
   history.push('/home')
   return { type: LOGOUT }
}

export const login = loginData => async dispatch => {
   try {
      const token = await authAPI.login(loginData)
      localStorage.setItem('token', token)
      dispatch(loginSuccess(token))
   } catch (e) {
      console.log(e)
      dispatch(checkAndSetAppError(e))
      dispatch(setAlert(e.response.data.message, 'error'))
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

export const checkAccess = () => async dispatch => {
   try {
      await delay()
      await authAPI.checkAccess()
   } catch (e) {
      console.log(e)
      dispatch(setError(e.response.data))
      dispatch(setAlert(e.response.data.message, 'error'))
      dispatch(checkAndSetAppError(e))
   } finally {
      dispatch(setIsChecked(true))
   }
}

export const registration = registerData => async dispatch => {
   try {
      await authAPI.registration(registerData)
      dispatch(registerSuccess)
   } catch (e) {
      console.log(e)
      dispatch(checkAndSetAppError(e))
      dispatch(setAlert(e.response.data.message, 'error'))
   }
}

export const resetPassword = email => async dispatch => {
   try {
      const { message } = await authAPI.resetPassword(email)
      dispatch(setAlert(message))
   } catch (e) {
      console.log(e)
      dispatch(checkAndSetAppError(e))
      dispatch(setAlert(e.response.data.message, 'error'))
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
      dispatch(setAlert(e.response.data.message, 'error'))
   }
}
