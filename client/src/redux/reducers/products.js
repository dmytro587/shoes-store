import {
   SET_IS_LOADING,
   SUCCESS_FETCHING_PRODUCTS,
   ERROR_FETCHING_PRODUCTS,
   REMOVE_PRODUCT_SUCCESS
} from '../actionTypes/products'

const initialState = {
   products: [],
   totalCount: 0,
   isLoading: false,
   error: null,
}

const productsReducer = (state = initialState, action) => {
   switch (action.type) {
      case SUCCESS_FETCHING_PRODUCTS:
         return {
            ...state,
            products: action.payload.items,
            totalCount: action.payload.totalCount,
            isLoading: false,
            error: null
         }

      case ERROR_FETCHING_PRODUCTS: {
         const { message, response } = action.payload
         const error = response ? response.data : ({ message })

         return {
            ...state,
            isLoading: false,
            error
         }
      }

      case REMOVE_PRODUCT_SUCCESS: {
         const totalCount = state.totalCount

         return {
            ...state,
            totalCount: totalCount >= 2 ? totalCount - 1 : totalCount
         }
      }

      case SET_IS_LOADING:
         return {
            ...state,
            isLoading: action.payload
         }

      default:
         return state
   }
}

export default productsReducer