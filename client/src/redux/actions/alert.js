import { REMOVE_ALERT, SET_ALERT } from '../actionTypes/alert'

export const removeAlert = {
   type: REMOVE_ALERT
}

export const setAlert = (msg, alertType = 'success', timeout = 10000) => dispatch => {
   dispatch({
      type: SET_ALERT,
      payload: { msg, type: alertType }
   })

   setTimeout(() => dispatch({
      type: REMOVE_ALERT
   }), timeout)
}

