import {
   SET_IS_LOADING,
   SUCCESS_FETCHING_PRODUCTS,
   ERROR_FETCHING_PRODUCTS
} from '../actionTypes/products'
import { checkAndSetAppError } from './app'
import { setAlert } from './alert'
import { productsAPI } from './../../api'

const setIsLoading = bool => ({
   type: SET_IS_LOADING,
   payload: bool
})

const successFetching = (items, totalCount) => ({
   type: SUCCESS_FETCHING_PRODUCTS,
   payload: { items, totalCount }
})

const errorFetching = error => ({
   type: ERROR_FETCHING_PRODUCTS,
   payload: error
})

export const fetchProducts = () => async (dispatch, getState) => {
   dispatch(setIsLoading(true))

   const { price, sizes, category, pageLimit, currentPage } = getState().filters
   const filters = {
      page: currentPage,
      limit: pageLimit,
      price,
      sizes,
      category
   }

   try {
      const { products, totalCount } = await productsAPI.fetchProducts(filters)
      dispatch(successFetching(products, totalCount))
   } catch (e) {
      console.log(e)
      dispatch(checkAndSetAppError(e))
      dispatch(errorFetching(e.response.data))
   }
}

export const addProduct = formData => async dispatch => {
   try {
      const response = await productsAPI.addProduct(formData)
      dispatch(setAlert(response.message))
   } catch (e) {
      console.log(e)
      dispatch(setAlert(e.response.data.message, 'error'))
   }
}

export const removeProduct = productId => async dispatch => {
   try {
      await productsAPI.removeById(productId)
   } catch (e) {
      console.log(e)
      dispatch(setAlert(e.response.data.message, 'error'))
   }
}