import { REMOVE_ALERT, SET_ALERT } from '../actionTypes/alert'

const initialState = {
   alert: {
      msg: null,
      type: null
   }
}

const alertReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_ALERT:
         return {
            ...state,
            alert: action.payload
         }

      case REMOVE_ALERT:
         return {
            ...state,
            alert: {
               msg: null,
               type: null
            }
         }

      default: return state
   }
}

export default alertReducer