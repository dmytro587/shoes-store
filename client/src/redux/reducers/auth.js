import {
   CLEAR_ALERT,
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_SUCCESS,
   SET_ALERT,
   SET_ERROR
} from '../actionTypes/auth'

const initialState = {
   token: null,
   isRegistered: false,
   isAuthed: false,
   alert: null,
   error: null
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case LOGIN_SUCCESS:
         return {
            ...state,
            token: action.payload,
            isAuthed: true,
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
            isAuthed: false,
            error: null
         }
      case SET_ERROR:
         return {
            ...state,
            error: action.payload
         }
      case SET_ALERT:
         return {
            ...state,
            alert: action.payload,
            error: null
         }
      case CLEAR_ALERT:
         return {
            ...state,
            alert: null
         }
      default: return state
   }
}

export default authReducer