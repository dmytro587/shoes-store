import { AxiosResponse } from 'axios'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { APIError, CartData, CartInfo, CartItem, ErrorData } from '@types'
import { AppDispatch, RootState } from '../store'

import { setAlert } from './alert'
import { cartAPI } from '../../services'
import { delay, history } from '@utils'


export const fetchCart = createAsyncThunk<CartData, void, {
   rejectValue: ErrorData
}>(
   'cart/fetchCart',
   async (_, {rejectWithValue}) => {
      try {
         return await cartAPI.fetchCart()
      } catch (err) {
         console.log(err)
         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
         // here must be dispatch error to alert reducer
      }
   }
)

export const fetchCartInfo = createAsyncThunk<CartInfo, void, {
   state: RootState,
   rejectValue: ErrorData
}>(
   'cart/fetchCartInfo',
   async (_, { getState, rejectWithValue }) => {
      try {
         if (!getState().auth.isAuthed) return Promise.reject() // зачем это, если в каждый запрос я добавляю токен и авторизация проверяется на бэке

         return await cartAPI.fetchCartInfo()
      } catch (err) {
         console.warn(err)
         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
      }
   }
)

export const addProductToCart = createAsyncThunk<
   void,
   string,
   {
      state: RootState
      dispatch: AppDispatch
   }
   >(
   'cart/addProductToCart',
   async (productId, { dispatch, getState }) => {
      try {
         // опять же, может это лучше делать блоке catch. если не авторизован - прилетает ошибка, далее эту ошибку обрабатываем в кетче
         if (!getState().auth.isAuthed) {
            dispatch(setAlert('Для добавления товара в корзину необходимо авторизоваться'))
            return history.push('/auth/login')
         }

         dispatch(addToProcessesState({
            itemId: productId,
            stateName: 'adding'
         }))

         await delay(200)
         await cartAPI.addProductToCart(productId)

         dispatch(fetchCartInfo())
      } catch (e) {
         console.warn(e)
      } finally {
         dispatch(removeFromProcessesState({
            itemId: productId,
            stateName: 'adding'
         }))
      }
   }
)

export const plusItemCount = createAsyncThunk<CartData, string>(
   'cart/plusItemCount',
   async (productId, { rejectWithValue }) => {
      try {
         return await cartAPI.plusProductCount(productId)
      } catch (err) {
         console.warn(err)
         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
      }
   }
)

export const minusItemCount = createAsyncThunk<CartData, string>(
   'cart/minusProductCount',
   async (productId, { rejectWithValue }) => {
      try {
         return await cartAPI.minusProductCount(productId)
      } catch (err) {
         console.warn(err)
         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
      }
   }
)

export const clearCart = createAsyncThunk<void, void, {
   dispatch: AppDispatch
}>(
   'cart/clearCart',
   async (_, { dispatch, rejectWithValue }) => {
      try {
         await cartAPI.clearCart()

         dispatch(clearCartSuccess)
      } catch (err) {
         console.warn(err)
         const error = err as APIError
         const response = error.response as AxiosResponse<ErrorData>

         return rejectWithValue(response.data)
      }
   }
)

export const removeProductFromCart = createAsyncThunk<CartData | void, string, {
   dispatch: AppDispatch
}>(
   'cart/removeProductFromCart',
   async (productId, { dispatch, rejectWithValue }) => {
      if (window.confirm('Вы действительно хотите удалить это товар из корзины?')) {
         dispatch(addToProcessesState({
            itemId: productId,
            stateName: 'removing'
         }))

         try {
            return await cartAPI.removeFromCart(productId)
         } catch (err) {
            console.warn(err)
            const error = err as APIError
            const response = error.response as AxiosResponse<ErrorData>

            return rejectWithValue(response.data)
         } finally {
            dispatch(removeFromProcessesState({
               itemId: productId,
               stateName: 'removing'
            }))
         }
      }
   }
)


// slice
interface ProcessesStatePayload {
   itemId: string
   stateName: 'removing' | 'adding'
}

const initialState = {
   isLoaded: false      as boolean,
   products: []         as CartItem[],
   totalPrice: 0        as number,
   totalCount: 0        as number,
   // можно соединить в один общий стэйт эффектов
   removingState: []    as string[], // or number. Specify
   addingState: []      as string[] // or number. Specify
}

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToProcessesState: (state, action: PayloadAction<ProcessesStatePayload>) => {
         const { itemId, stateName } = action.payload

         if (stateName === 'removing') state.removingState.push(itemId)
         else if (stateName === 'adding') state.addingState.push(itemId)
      },
      removeFromProcessesState: (state, action: PayloadAction<ProcessesStatePayload>) => {
         const { itemId, stateName } = action.payload

         if (stateName === 'removing')
            state.removingState = state.removingState.filter(id => id !== itemId)
         else if (stateName === 'adding')
            state.removingState = state.addingState.filter(id => id !== itemId)
      },
      clearCartSuccess: state => {
         state.products = []
         state.totalPrice = 0
         state.totalCount = 0
      }
   },

   extraReducers: builder => {
      builder
         .addCase(fetchCart.pending, (state, action) => {
            state.isLoaded = false
         })
         .addCase(fetchCart.fulfilled, (state, action) => {
            const { products, totalCount, totalPrice } = action.payload

            console.log(action.meta.arg)

            state.isLoaded = true
            state.products = products
            state.totalPrice = totalPrice
            state.totalCount = totalCount
         })
         .addCase(fetchCart.rejected, (state) => {
            state.isLoaded = false
         })

      builder.addCase(fetchCartInfo.fulfilled, (state, action) => {
         const { totalCount, totalPrice } = action.payload
         state.totalCount = totalCount
         state.totalPrice = totalPrice
      })

      builder.addCase(plusItemCount.fulfilled, (state, action) => {
         const { products, totalPrice, totalCount } = action.payload
         state.products = products
         state.totalPrice = totalPrice
         state.totalCount = totalCount
      })

      builder.addCase(minusItemCount.fulfilled, (state, action) => {
         const { products, totalPrice, totalCount } = action.payload
         state.products = products
         state.totalPrice = totalPrice
         state.totalCount = totalCount
      })
   }
})

export const { addToProcessesState, removeFromProcessesState, clearCartSuccess } = cartSlice.actions

export const selectProducts = (state: RootState) => state.cart.products
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice
export const selectTotalCount = (state: RootState) => state.cart.totalCount
export const selectRemovingState = (state: RootState) => state.cart.removingState
export const selectAddingState = (state: RootState) => state.cart.addingState
export const selectIsLoaded = (state: RootState) => state.cart.isLoaded


export default cartSlice.reducer




