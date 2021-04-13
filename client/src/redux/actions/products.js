import { SET_IS_LOADING, SET_PRODUCTS, SET_PRODUCTS_ADDED_TO_CART } from '../actionTypes/products'
import { fetchProducts as fetchProductsAPI } from '../../api/api'


const setIsLoading = bool => ({
   type: SET_IS_LOADING,
   payload: bool
})

const setProducts = (items, totalCount) => ({
   type: SET_PRODUCTS,
   payload: { items, totalCount }
})

export const setProductsAddedToCart = obj => ({
   type: SET_PRODUCTS_ADDED_TO_CART,
   payload: obj
})

export const fetchProducts = (filters, currentPage) => async (dispatch, getState) => {
   dispatch(setIsLoading(true))

   const pagination = {
      page: currentPage,
      limit: getState().filters.pageLimit
   }

   try {
      const { products, totalCount } = await fetchProductsAPI(filters, pagination)
      dispatch(setProducts(products, totalCount))
   } catch (e) {
      console.log('fetchProducts', e)
      dispatch(setIsLoading(false))
   }
}