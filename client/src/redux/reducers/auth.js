import {
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_SUCCESS,
   SET_ERROR
} from '../actionTypes/auth'

const initialState = {
   token: null,
   isRegistered: false,
   error: null
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOGIN_SUCCESS:
         return {
            ...state,
            token: action.payload,
            error: null
         }
      case REGISTER_SUCCESS:
         return {
            ...state,
            isRegistered: true,
            error: null
         }
      case LOGOUT:
         return {
            ...state,
            token: null,
            error: null
         }
      case SET_ERROR:
         return {
            ...state,
            error: action.payload
         }
      default: return state
   }
}

export default authReducer