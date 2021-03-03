import {
   CLEAR_CART,
   ADD_PRODUCT_TO_CART,
   SET_REMOVING_STATE,
   PLUS_ITEM_COUNT, MINUS_ITEM_COUNT, REMOVE_FROM_CART, SET_SIZE
} from '../actionTypes/cart'
import { sleep } from '../../utils'

const setRemovingState = (itemId, bool) => ({
   type: SET_REMOVING_STATE,
   payload: {
      itemId,
      isLoading: bool
   }
})

const removeFromCart = itemId => ({
   type: REMOVE_FROM_CART,
   payload: itemId
})

export const setProductSize = (id, size) => ({
   type: SET_SIZE,
   payload: { id, size }
})

export const clearCart = {
   type: CLEAR_CART
}

export const plusItemCount = itemId => ({
   type: PLUS_ITEM_COUNT,
   payload: itemId
})

export const minusItemCount = itemId => ({
   type: MINUS_ITEM_COUNT,
   payload: itemId
})

export const addProductToCart = ({ id, imgUrl, name, sizes, price, selectedSize }) => ({
   type: ADD_PRODUCT_TO_CART,
   payload: {
      id, imgUrl,
      name, sizes,
      price, selectedSize,
      count: 1,
      totalPrice: price
   }
})

export const removeItemFromCart = itemId => async dispatch => {
   if (window.confirm('Вы действительно хотите удалить это товар из корзины?')) {
      dispatch(setRemovingState(itemId, true))

      await sleep(1000)

      dispatch(removeFromCart(itemId))
      dispatch(setRemovingState(itemId, false))
   }
}


