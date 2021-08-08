import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ErrorData, Product } from '@types'
import { RootState } from '../store'

import { APIError, FetchProductsResponse } from '@types'
import { AxiosResponse } from 'axios'
import { AppDispatch } from '../store'
import { setAlert } from './alert'
import { productsAPI } from '@services'


export const fetchProducts = createAsyncThunk<
      FetchProductsResponse,
      number | undefined,
      { state: RootState, rejectValue: ErrorData }
   >(
   'products/fetchProducts',
   async (pageLimit = undefined, { getState, rejectWithValue }) => {
      const { pagination, variants } = getState().filters
      const filters = {
         ...pagination,
         ...variants,
         pageLimit: pageLimit || pagination.pageLimit
      }

      try {
         return await productsAPI.fetchProducts(filters)
      } catch (err) {
         console.warn(err)
         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
      }
   }
)

export const addProduct = createAsyncThunk<void, Product, { dispatch: AppDispatch }>(
   'products/addProduct',
   async (formData, { dispatch, rejectWithValue }) => {
      try {
         const response = await productsAPI.addProduct(formData)
         dispatch(setAlert(response.message))
      } catch (err) {
         console.warn(err)
         dispatch(setAlert(err.response.data.message, 'error'))
         return rejectWithValue(err.response.data)
      }
   }
)

export const removeProduct = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
   'products/removeProduct',
   async (productId, { dispatch }) => {
      try {
         await productsAPI.removeById(productId)
      } catch (err) {
         console.warn(err)
         dispatch(setAlert(err.response.data.message, 'error'))
      }
   }
)

export const editProduct = createAsyncThunk<void, {
   productId: string
   productData: Product
}, { dispatch: AppDispatch }>(
   'products/editProduct',
   async (data, { dispatch }) => {
      try {
         await productsAPI.editById(data.productId, data.productData)
         dispatch(setAlert('Товар успешно изменён'))
      } catch (err) {
         console.warn(err)
         dispatch(setAlert(err.response.data.message, 'error'))
      }
   }
)

export const fetchProductById = createAsyncThunk<Product, string>(
   'products/fetchProductById',
   async (productId, { rejectWithValue }) => {
      try {
         return await productsAPI.getProductById(productId)
      } catch (err) {
         console.warn(err)
         return rejectWithValue(err.response.data)
      }
   }
)

// TODO: что это за хуета???
// export const fetchProductById = (productId: string): ThunkFn<Promise<Product>> => async dispatch => {
//    try {
//       return await productsAPI.getProductById(productId)
//    } catch (err) {
//       console.warn(err)
//    }
// }


// slice
const initialState = {
   products: []         as Product[],
   totalCount: 0        as number,
   isLoading: false     as boolean,
   error: null          as ErrorData | null,
}

const productsSlice = createSlice({
   name: 'products',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.isLoading = true
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.products = action.payload.products
            state.totalCount = action.payload.totalCount
            state.error = null
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false

            if (action.payload) state.error = action.payload
         })

      builder.addCase(removeProduct.fulfilled, (state) => {
         const totalCount = state.totalCount
         state.totalCount = totalCount >= 2 ? totalCount - 1 : totalCount
      })
   }
})

export const selectProducts = (state: RootState) => state.products.products
export const selectIsLoading = (state: RootState) => state.products.isLoading
export const selectTotalPages = (state: RootState) => Math.ceil(state.products.totalCount / state.filters.pagination.pageLimit)
export const selectTotalCount = (state: RootState) => state.products.totalCount
export const selectError = (state: RootState) => state.products.error


export default productsSlice.reducer

