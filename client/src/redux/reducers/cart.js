import {
   CLEAR_CART,
   FETCH_CART_INFO_SUCCESS,
   FETCH_CART_SUCCESS,
   SET_REMOVING_STATE,
   SET_IS_LOADED, SET_ADDING_STATE
} from '../actionTypes/cart'

const initialState = {
   products: [],
   totalPrice: 0,
   totalCount: 0,
   isLoaded: false,
   removingState: [],
   addingState: []
}

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case FETCH_CART_SUCCESS: {
         const { products, totalPrice, totalCount } = action.payload

         return {
            ...state,
            products,
            totalPrice,
            totalCount
         }
      }

      case FETCH_CART_INFO_SUCCESS: {
         const { totalPrice, totalCount } = action.payload

         return {
            ...state,
            totalPrice,
            totalCount
         }
      }

      case SET_REMOVING_STATE: {
         let removing = [...state.removingState]
         const { itemId, isLoading } = action.payload

         if (isLoading) removing.push(itemId)
         else removing = removing.filter(id => id !== itemId)

         return {
            ...state,
            removingState: removing
         }
      }

      case SET_ADDING_STATE: {
         let adding = [...state.addingState]
         const { itemId, isLoading } = action.payload

         if (isLoading) adding.push(itemId)
         else adding = adding.filter(id => id !== itemId)

         return {
            ...state,
            addingState: adding
         }
      }

      case SET_IS_LOADED:
         return {
            ...state,
            isLoaded: action.payload
         }

      case CLEAR_CART:
         return {
            ...state,
            products: [],
            totalPrice: 0,
            totalCount: 0
         }

      default: return state
   }
}

export default cartReducer