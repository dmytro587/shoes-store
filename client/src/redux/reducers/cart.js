import {
   ADD_PRODUCT_TO_CART,
   CLEAR_CART,
   MINUS_ITEM_COUNT,
   PLUS_ITEM_COUNT,
   REMOVE_FROM_CART,
   SET_REMOVING_STATE,
   SET_SIZE
} from '../actionTypes/cart'

const initialState = {
   products: [],
   totalPrice: 0,
   totalItems: 0,
   isLoading: false,
   removingState: []
}

const calculateProductItem = (operation, state, action) => {
   let productPrice = 0
   const newProducts = [...state.products]

   newProducts.forEach(product => {
      if (product.id === action.payload) {
         operation === 'plus'
            ? product.count += + 1
            : product.count -= + 1

         operation === 'plus'
            ? product.totalPrice += product.price
            : product.totalPrice -= product.price

         productPrice = product.price
      }
   })

   return {
      productPrice,
      newProducts
   }
}

const cartReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_REMOVING_STATE: {
         let newRemovingState = [...state.removingState]

         if (!action.payload.isLoading) {
            newRemovingState = newRemovingState.filter(item => item.itemId !== action.payload.itemId)
         } else {
            newRemovingState.push(action.payload)
         }

         return {
            ...state,
            removingState: newRemovingState
         }
      }

      case SET_SIZE:
         return {
            ...state,
            products: [...state.products].map(product => {
               if (product.id === action.payload.id) {
                  product.selectedSize = action.payload.size
               }

               return product
            })
         }

      case ADD_PRODUCT_TO_CART: {
         const { id } = action.payload
         const productPrice = action.payload.price
         const newProducts = [...state.products]

         if (state.products.some(el => el.id === id)) {
            newProducts.map(product => {
               if (product.id === id) {
                  product.count = product.count + 1
                  product.totalPrice = product.price * product.count
               }

               return product
            })
         } else {
            newProducts.push(action.payload)
         }

         return {
            ...state,
            products: newProducts,
            totalPrice: state.totalPrice + productPrice,
            totalItems: state.totalItems + 1
         }
      }

      case PLUS_ITEM_COUNT: {
         const { productPrice, newProducts } = calculateProductItem('plus', state, action)

         return {
            ...state,
            products: newProducts,
            totalPrice: state.totalPrice + productPrice,
            totalItems: state.totalItems + 1
         }
      }

      case MINUS_ITEM_COUNT: {
         if (state.totalItems - 1 === 0) return state

         const { productPrice, newProducts } = calculateProductItem('minus', state, action)

         return {
            ...state,
            products: newProducts,
            totalPrice: state.totalPrice - productPrice,
            totalItems: state.totalItems - 1
         }
      }

      case REMOVE_FROM_CART:
         const removingItem = state.products.find(i => i.id === action.payload)

         return {
            ...state,
            products: state.products.filter(item => item.id !== action.payload),
            totalItems: state.totalItems - removingItem.count,
            totalPrice: state.totalPrice - removingItem.totalPrice,
         }

      case CLEAR_CART:
         return {
            ...state,
            products: [],
            totalPrice: 0,
            totalItems: 0
         }

      default:
         return state
   }
}

export default cartReducer