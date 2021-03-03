import { SET_CATEGORY, SET_SORT_BY, SET_SORT_BY_SIZES } from '../actionTypes/filters'

export const setCategory = catType => ({
   type: SET_CATEGORY,
   payload: catType
})

export const setSortBy = (type, order = null, priceRange = null) => ({
   type: SET_SORT_BY,
   payload: { type, order, priceRange }
})

export const setSortBySizes = sizeRange => ({
   type: SET_SORT_BY_SIZES,
   payload: sizeRange
})

