import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrderFilter, CategoryFilter } from '@types'
import { RootState } from '../store'
import { DEFAULT_PAGE_LIMIT } from '@config'

interface Price {
   order: OrderFilter
   from: number
   to: number
}

const initialState = {
   pagination: {
      currentPage: 1                   as number,
      pageLimit: DEFAULT_PAGE_LIMIT    as number
   },
   variants: {
      price: {
         order: 'asc',
         from: 0,
         to: 0
      } as Price,
      sizes: []         as number[],
      category: null    as CategoryFilter
   }
}

const filtersSlice = createSlice({
   name: 'filters',
   initialState,
   reducers: {
      setCurrentPage: (state, action: PayloadAction<number>) => {
        state.pagination.currentPage = action.payload
      },
      setCategory: (state, action: PayloadAction<CategoryFilter>) => {
         state.variants.category = action.payload
      },
      setPrice: (state, action: PayloadAction<Price>) => {
         state.variants.price = action.payload
      },
      setPriceOrder: (state, action: PayloadAction<OrderFilter>) => {
        state.variants.price.order = action.payload
      },
      setSizes: (state, action: PayloadAction<number[]>) => {
         state.variants.sizes = action.payload
      }
   }
})

export const { setCurrentPage, setCategory, setPrice, setPriceOrder, setSizes } = filtersSlice.actions

export const selectAllFilters = (state: RootState) => state.filters
export const selectPriceFilter = (state: RootState) => state.filters.variants.price
export const selectSizeFilter = (state: RootState) => state.filters.variants.sizes
export const selectCategoryFilter = (state: RootState) => state.filters.variants.category
export const selectCurrentPage = (state: RootState) => state.filters.pagination.currentPage

export default filtersSlice.reducer