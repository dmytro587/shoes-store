import { request } from './APIUtils'
import { CartData, CartInfo, JustMessage } from '@types'

const cartAPI = {
   fetchCart() {
      return request<CartData>({
         method: 'GET',
         url: 'cart'
      })
   },

   fetchCartInfo() {
      return request<CartInfo>({
         method: 'GET',
         url: 'cart/info'
      })
   },

   addProductToCart(productId: string) {
      return request<JustMessage>({
         method: 'POST',
         url: 'cart/add',
         data: { productId }
      })
   },

   plusProductCount(productId: string) {
      return request<CartData>({
         method: 'PUT',
         url: 'cart/plus-product-count',
         data: { productId }
      })
   },

   minusProductCount(productId: string) {
      return request<CartData>({
         method: 'PUT',
         url: 'cart/minus-product-count',
         data: { productId }
      })
   },

   async removeFromCart(productId: string) {
      return request<CartData>({
         method: 'DELETE',
         url: `cart/remove/${productId}`
      })
   },

   async clearCart() {
      return request<JustMessage>({
         method: 'PUT',
         url: 'cart/clear'
      })
   }
}

export default cartAPI