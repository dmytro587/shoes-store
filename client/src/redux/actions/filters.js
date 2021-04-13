import {
   SET_CATEGORY,
   SET_CURRENT_PAGE,
   SET_SORT_BY_PRICE,
   SET_SORT_BY_SIZES
} from '../actionTypes/filters'

export const setCategory = category => ({
   type: SET_CATEGORY,
   payload: category
})

export const setSortByPrice = (order = null, from = 0, to = 0) => ({
   type: SET_SORT_BY_PRICE,
   payload: { order, from, to }
})

export const setSortBySize = sizeRange => ({
   type: SET_SORT_BY_SIZES,
   payload: sizeRange
})

export const setCurrentPage = currentPage => ({
   type: SET_CURRENT_PAGE,
   payload: currentPage
})

