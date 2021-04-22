import { SET_ERROR, INITIALIZE_SUCCESS } from '../actionTypes/app'

const initialState = {
   isInitialized: false,
   error: null
}

const appReducer = (state = initialState, action) => {
   switch (action.type) {
      case INITIALIZE_SUCCESS:
         return {
            ...state,
            isInitialized: true
         }

      case SET_ERROR:
         return {
            ...state,
            error: action.payload
         }
      default: return state
   }
}

export default appReducer