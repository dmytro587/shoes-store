import {
   LOGIN_SUCCESS,
   LOGOUT,
   REGISTER_SUCCESS,
   SET_ERROR,
   SET_IS_CHECKED
} from '../actionTypes/auth'

const initialState = {
   token: null,
   isRegistered: false,
   isAuthed: false,
   error: null,
   isChecked: false
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

      case SET_IS_CHECKED:
         return {
            ...state,
            isChecked: action.payload
         }

      default: return state
   }
}

export default authReducer