import axios from 'axios'
import { delay } from '../utils'


const instance = axios.create({
   baseURL: 'http://localhost:5000/api/'
})

export const fetchProducts = async (sortByObj, pagination) => {
   await delay()

   const { price, sizes, category } = sortByObj
   const { page, limit } = pagination

   const limitUrl = limit
      ? `limit=${limit}&`
      : ''

   const pageUrl = page >= 1
      ? `page=${page}&`
      : ''

   const sizesUrl = sizes.length > 0
      ? `sizes=${ sizes.join(',') }&`
      : ''

   const categoryUrl = (category !== 'all') && category
      ? `category=${category}&` : ''

   const priceRangeUrl = !price.order
      ? `priceRange=${price.from || 0}-${price.to || 0}&` : ''

   const priceSortUrl = price.order ? (
      price.order === 'asc' ? `priceSort=asc&` :
      price.order === 'desc' ? `priceSort=desc&` : ''
   ) : ''

   const response = await instance.get(
      'products?'
      + categoryUrl
      + priceSortUrl
      + priceRangeUrl
      + priceRangeUrl
      + sizesUrl
      + pageUrl
      + limitUrl
   )

   return response.data
}


