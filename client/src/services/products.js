import { instance } from './api'
import { delay } from '../utils'

const productsAPI = {
   async fetchProducts(filters) {
      await delay()

      const { price, sizes, category, page, limit } = filters

      const limitUrl = limit
         ? `limit=${ limit }&`
         : ''

      const pageUrl = page >= 1
         ? `page=${ page }&`
         : ''

      const sizesUrl = sizes.length > 0
         ? `sizes=${ sizes.join(',') }&`
         : ''

      const categoryUrl = (category !== 'all') && category
         ? `category=${ category }&` : ''

      const priceRangeUrl = !price.order
         ? `priceRange=${ price.from || 0 }-${ price.to || 0 }&` : ''

      const priceSortUrl = price.order ? (
         price.order === 'asc' ? `priceSort=asc&` :
            price.order === 'desc' ? `priceSort=desc&` : ''
      ) : ''

      const url = ['products?']

      url.push(categoryUrl)
      url.push(priceSortUrl)
      url.push(priceRangeUrl)
      url.push(sizesUrl)
      url.push(pageUrl)
      url.push(limitUrl)

      const response = await instance.get(url.join(''))

      return response.data
   },

   async addProduct(productData) {
      const { name, price, imgUrl, sizes, categories } = productData

      const response = await instance.post('products/add-product', {
         name, price, imgUrl, sizes, categories
      })

      return response.data
   },

   async getProductById(productId) {
      const response = await instance.get(`products/${ productId }`)

      return response.data
   },

   removeById(productId) {
      return instance.delete(`products/remove/${ productId }`)
   },

   async editById(productId, { name, price, imgUrl, sizes, categories }) {

      return instance.put('products/edit', {
         id: productId,
         name,
         price,
         imgUrl,
         sizes,
         categories
      })
   }
}

export default productsAPI