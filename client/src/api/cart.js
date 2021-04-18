import { instance, getHeadersWithAuth } from './api'

const cartAPI = {
   async fetchCart() {
      const response = await instance.get('cart', getHeadersWithAuth())

      return response.data
   },

   async fetchCartInfo() {
      const response = await instance.get('cart/info', getHeadersWithAuth())

      return response.data
   },

   async addProductToCart(productId) {
      return instance.post('cart/add', { productId }, getHeadersWithAuth())
   },

   async plusProductCount(productId) {
      const response = await instance.put('cart/plus-product-count', {
         productId
      }, getHeadersWithAuth())

      return response.data
   },

   async minusProductCount(productId) {
      const response = await instance.put('cart/minus-product-count', {
         productId
      }, getHeadersWithAuth())

      return response.data
   },

   async removeFromCart(productId) {
      const response = await instance.delete(`cart/remove/${productId}`, getHeadersWithAuth())

      return response.data
   },

   async clearCart() {
      return instance.put('cart/clear', {}, getHeadersWithAuth())
   }
}

export default cartAPI