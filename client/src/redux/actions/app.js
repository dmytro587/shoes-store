import { SET_ERROR, INITIALIZE_SUCCESS } from '../actionTypes/app'
import { autoLogin } from './auth'
import { delay } from '../../utils'

const initializeSuccess = {
   type: INITIALIZE_SUCCESS
}

export const setError = err => ({
   type: SET_ERROR,
   payload: err
})

export const initializeApp = () => dispatch => {
   Promise.all([
      dispatch(autoLogin())
   ]).then(async () => {
      await delay(200)
      dispatch(initializeSuccess)
   })
}