import { instance } from './APIUtils'

const cartAPI = {
   async fetchCart() {
      const response = await instance.get('cart')

      return response.data
   },

   async fetchCartInfo() {
      const response = await instance.get('cart/info')

      return response.data
   },

   async addProductToCart(productId) {
      return instance.post('cart/add', { productId })
   },

   async plusProductCount(productId) {
      const response = await instance.put('cart/plus-product-count', {
         productId
      })

      return response.data
   },

   async minusProductCount(productId) {
      const response = await instance.put('cart/minus-product-count', {
         productId
      })

      return response.data
   },

   async removeFromCart(productId) {
      const response = await instance.delete(`cart/remove/${productId}`)

      return response.data
   },

   async clearCart() {
      return instance.put('cart/clear')
   }
}

export default cartAPI