import { INITIALIZE_SUCCESS } from '../actionTypes/app'

const initialState = {
   isInitialized: false
}

const appReducer = (state = initialState, action) => {
   switch (action.type) {
      case INITIALIZE_SUCCESS:
         return {
            ...state,
            isInitialized: true
         }
      default: return state
   }
}

export default appReducer