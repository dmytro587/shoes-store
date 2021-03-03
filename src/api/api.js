import { sleep } from '../utils'

const api = {
   fetchProducts: async (sortBy, category) => {
      await sleep()

      const {
         type,
         order,
         priceRange: { value, type: rangeType },
         sizeRange
      } = sortBy
      const baseUrl = 'http://localhost:3004/products?'
      const categoryUrl = (category !== 'all') && category ? `category_like=${ category }` : ''
      let priceRangeUrl = ''

      // eslint-disable-next-line
      switch (rangeType) {
         case 'toN':
            priceRangeUrl = `price.raw_gte=0&price.raw_lte=${ value[0] }`
            break
         case 'fromNToN':
            priceRangeUrl = `price.raw_gte=${ value[0] }&price.raw_lte=${ value[1] }`
            break
         case 'fromN':
            priceRangeUrl = `price.raw_gte=${ value[0] }`
            break
         default:
            priceRangeUrl = ''
      }

      const generateSizeUrls = arr => {
         let url = ''
         arr.forEach(item => url += `variants.sizes_like=${item}&`)

         return url
      }

      const sizeRangeUrl = generateSizeUrls(sizeRange)

      const response = await fetch(
         `${ baseUrl }_sort=${ type }.raw&_order=${ order }&${ categoryUrl }&${ priceRangeUrl }&${ sizeRangeUrl }`
      )

      return await response.json()
   }

}

export default api