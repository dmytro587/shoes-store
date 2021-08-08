import * as queryString from 'query-string'
import { FetchProductsResponse, JustMessage, Product, ProductsFilters } from '@types'
import { request } from './APIUtils'
import { delay } from '@utils'

// const categoryUrl = (category !== 'all') && category ? `category=${ category }&` : ''

const productsAPI = {
   // ProductsFilters можно перенести в этот файл т.к. этот тип используется только тут
   async fetchProducts(filters: ProductsFilters) {
      await delay()

      const { pageLimit, price, category, currentPage, sizes } = filters

      const queryParams = queryString.stringify({
         limit: pageLimit,
         page: currentPage,
         priceSort: price.order,
         priceRange: `${ price.from || 0 }-${ price.to || 0 }`,
         category,
         sizes
      })

      return await request<FetchProductsResponse>({
         method: 'GET',
         url: `products?${ queryParams }`
      })
   },

   async addProduct(productData: Product) {
      return await request<JustMessage>({
         method: 'POST',
         url: 'products/add-product',
         data: productData
      })
   },

   async getProductById(productId: string) {
      return await request<Product>({
         method: 'GET',
         url: `products/${ productId }`
      })
   },

   removeById(productId: string) {
      return request({
         method: 'DELETE',
         url: `products/remove/${ productId }`
      })
   },

   editById(productId: string, productData: Product) {
      return request<JustMessage>({
         method: 'PUT',
         url: 'products/edit',
         data: {
            id: productId,
            ...productData
         }
      })
   }
}

export default productsAPI