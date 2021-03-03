import { SET_CATEGORY, SET_SORT_BY, SET_SORT_BY_SIZES } from '../actionTypes/filters'

const initialState = {
   sortBy: {
      type: 'price',
      order: 'asc',
      priceRange: {
         value: [],
         type: null
      },
      sizeRange: []
   },
   category: null
}

const filters = (state = initialState, action) => {
   switch (action.type) {
      case SET_CATEGORY:
         return {
            ...state,
            category: action.payload
         }

      case SET_SORT_BY: {
         const payload = action.payload

         if (!payload.priceRange) {
            payload.priceRange = { value: [], type: null }
         }
         if (!payload.order) delete payload.order

         return {
            ...state,
            sortBy: { ...state.sortBy, ...payload }
         }
      }

      case SET_SORT_BY_SIZES:
         return {
            ...state,
            sortBy: {
               ...state.sortBy,
               sizeRange: action.payload || []
            }
         }

      default:
         return state
   }
}

export default filters