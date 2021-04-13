import {
   SET_CATEGORY, SET_CURRENT_PAGE,
   SET_SORT_BY_PRICE,
   SET_SORT_BY_SIZES
} from '../actionTypes/filters'

const initialState = {
   currentPage: 1,
   pageLimit: 6,
   price: {
      order: 'asc',
      from: 0,
      to: 0
   },
   sizes: [],
   category: null,
}

const filters = (state = initialState, action) => {
   switch (action.type) {
      case SET_CATEGORY:
         return {
            ...state,
            category: action.payload
         }

      case SET_SORT_BY_PRICE:
         return {
            ...state,
            price: {
               ...state.price,
               ...action.payload
            }
         }

      case SET_SORT_BY_SIZES:
         return {
            ...state,
            sizes: action.payload || [],
         }

      case SET_CURRENT_PAGE:
         return {
            ...state,
            currentPage: action.payload
         }

      default: return state
   }
}

export default filters