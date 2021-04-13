import { SET_IS_LOADING, SET_PRODUCTS, SET_PRODUCTS_ADDED_TO_CART } from '../actionTypes/products'

const initialState = {
   products: [],
   totalCount: 0,
   isLoading: false,
   productsAddedToCart: []
}

const productsReducer = (state = initialState, action) => {
   switch (action.type) {

      case SET_PRODUCTS:
         return {
            ...state,
            products: action.payload.items,
            totalCount: action.payload.totalCount,
            isLoading: false
         }

      case SET_IS_LOADING:
         return {
            ...state,
            isLoading: action.payload
         }

      case SET_PRODUCTS_ADDED_TO_CART:
         return {
            ...state,
            productsAddedToCart: [ ...action.payload ]
         }

      default:
         return state
   }
}

export default productsReducer