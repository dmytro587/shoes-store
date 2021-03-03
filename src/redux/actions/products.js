import { SET_IS_LOADING, SET_PRODUCTS, SET_PRODUCTS_ADDED_TO_CART } from '../actionTypes/products'

import api from '../../api/api'


const setIsLoading = bool => ({
   type: SET_IS_LOADING,
   payload: bool
})

const setProducts = items => ({
   type: SET_PRODUCTS,
   payload: items
})

export const setProductsAddedToCart = obj => ({
   type: SET_PRODUCTS_ADDED_TO_CART,
   payload: obj
})

export const fetchProducts = (sortBy, category) => async dispatch => {
   dispatch(setIsLoading(true))

   try {
      const products = await api.fetchProducts(sortBy, category)
      dispatch(setProducts(products))
   } catch (e) {
      console.log('fetchProducts', e)
      dispatch(setIsLoading(false))
   }
}