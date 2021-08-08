import { OrderFilter } from '@types'

export const DEFAULT_PAGE_LIMIT = 6

export const dataForRender = {
   CATEGORIES: [
      { name: 'Все', type: 'all' },
      { name: 'Ботинки', type: 'boots' },
      { name: 'Кроссовки', type: 'trainers' }
   ],

   SORT_BY_PRICE_ITEMS: [
      { name: 'От дешевых', order: 'desc' },
      { name: 'От дорогих', order: 'asc' }
   ] as { name: string, order: OrderFilter }[],

   AVAILABLE_SIZES: [36, 37, 38, 39, 40, 41, 42, 43],

   PRICE_FILTERS: [
      {
         id: 1,
         name: 'price-range',
         text: 'До 500 грн',
         range: [0, 500],
         value: 'option1'
      },
      {
         id: 2,
         name: 'price-range',
         text: 'От 500 до 1000 грн',
         range: [500, 1000],
         value: 'option2'
      },
      {
         id: 3,
         name: 'price-range',
         text: 'От 1000 грн',
         range: [1000, 0],
         value: 'option3'
      },
      {
         id: 4,
         name: 'price-range',
         text: 'Все',
         range: [0, 0],
         value: 'option4'
      }
   ],

   ADMIN_NAVIGATION_ITEMS: [
      {
         to: '/admin/add-product',
         text: 'Добавить товар',
         path: ['/admin', '/admin/add-product']
      },
      {
         to: '/admin/products-list',
         text: 'Список товара',
         path: ['/admin/products-list']
      }
   ]
}