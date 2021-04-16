import { INITIALIZE_SUCCESS } from '../actionTypes/app'
import { autoLogin } from './auth'

const initializeSuccess = {
   type: INITIALIZE_SUCCESS
}

export const initializeApp = () => dispatch => {
   Promise.all([
      dispatch(autoLogin())
   ]).then(() => {
      dispatch(initializeSuccess)
   })
}