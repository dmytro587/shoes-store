import axios from 'axios'
import { delay } from '../utils'

const instance = axios.create({
   baseURL: 'http://localhost:5000/api/'
})

const getHeadersWithAuth = () => {
   const token = localStorage.getItem('token')
   if (token) {
      return {
         headers: { 'Authorization': 'Bearer ' + token }
      }
   }

   return {}
}

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
      + limitUrl,
      getHeadersWithAuth()
   )

   return response.data
}

export const autoLogin = () => {
   return instance.get('auth/check-auth', getHeadersWithAuth())
}

export const login = async ({ username, email, password }) => {
   const response = await instance.post('auth/login', {
      username,
      email,
      password
   })

   return response.data.token
}

export const registration = async ({ username, email, password, confirm }) => {
   const response = await instance.post('auth/registration', {
      username,
      email,
      password,
      confirm
   })

   return response.data
}

export const fetchCart = async () => {
   const response = await instance.get('cart', getHeadersWithAuth())

   return response.data
}

export const fetchCartInfo = async () => {
   const response = await instance.get('cart/info', getHeadersWithAuth())

   return response.data
}

export const addProductToCart = productId => {
   return instance.post('cart/add', { productId }, getHeadersWithAuth())
}

export const plusProductCount = async productId => {
   const response = await instance.put('cart/plus-product-count', {
      productId
   }, getHeadersWithAuth())

   return response.data
}

export const minusProductCount = async productId => {
   const response = await instance.put('cart/minus-product-count', {
      productId
   }, getHeadersWithAuth())

   return response.data
}

export const removeFromCart = async productId => {
   const response = await instance.delete(`cart/remove/${productId}`, getHeadersWithAuth())

   return response.data
}

export const clearCart = async () => {
   return instance.put('cart/clear', {}, getHeadersWithAuth())
}


