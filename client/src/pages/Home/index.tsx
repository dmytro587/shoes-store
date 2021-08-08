import React, { useCallback, useEffect, useMemo } from 'react'

import { useAppDispatch, useAppSelector } from '@hooks'
import { selectIsAuthed } from '@redux/slices/auth'

import {
   selectError as selectProductsError,
   selectIsLoading,
   selectTotalPages,
   selectProducts,
   fetchProducts
} from '@redux/slices/products'

import {
   addProductToCart,
   fetchCartInfo
} from '@redux/slices/cart'

import {
   selectCurrentPage,
   selectAllFilters,
   setCategory,
   setCurrentPage,
   setPriceOrder
} from '@redux/slices/filters'

import {
   ProductLoader,
   ProductCard,
   Categories,
   SortPanel
} from './components'

import { Sidebar, Pagination } from '@components'
import { dataForRender } from '@config'
import { CategoryFilter, OrderFilter } from '@types'

import s from './Home.module.sass'


const { CATEGORIES, SORT_BY_PRICE_ITEMS } = dataForRender

const Home: React.FC = () => {
   const dispatch       = useAppDispatch()
   const isAuthed       = useAppSelector(selectIsAuthed)
   const currentPage    = useAppSelector(selectCurrentPage)
   const products       = useAppSelector(selectProducts)
   const totalPages     = useAppSelector(selectTotalPages)
   const allFilters     = useAppSelector(selectAllFilters)
   const isLoading      = useAppSelector(selectIsLoading)
   const productsError  = useAppSelector(selectProductsError)

   useEffect(() => {
      dispatch(fetchCartInfo())
      // eslint-disable-next-line
   }, [])

   useEffect(() => {
      dispatch(fetchProducts())
      // eslint-disable-next-line
   }, [allFilters, isAuthed])

   const onSortClick = (order: OrderFilter) =>
      dispatch(setPriceOrder(order))

   const onSelectCategory = (category: CategoryFilter) =>
      dispatch(setCategory(category))

   const onChangePage = (pageNumber: number) =>
      dispatch(setCurrentPage(pageNumber))

   const addToCartHandler = (productId: string) =>
      dispatch(addProductToCart(productId))

   const productsList = useMemo(() => (
      products.map(product => (
         <ProductCard
            key={ product._id }
            id={ product._id || '' }
            onAddClick={ addToCartHandler }
            name={ product.name }
            price={ product.price }
            imgUrl={ product.imgUrl }
            sizes={ product.sizes }
         />
      ))
      // eslint-disable-next-line
   ), [products])

   const renderContent = useCallback(() => {
      switch (true) {
         case isLoading:
            return Array(10)
               .fill('')
               .map((_, index) => <ProductLoader key={ index }/>)

         case products.length > 0:
            return productsList

         case products.length === 0:
            return <h4>За указанными параметрами ничего не найдено</h4>

         case Boolean(productsError):
            return (
               <div className={ s.error }>
                  <h2>Ошибка <span>{ productsError?.status }</span></h2> {/* TODO: пофиксить ts lint. он думает что productsError может быть null'ом в этом кейсе */}
                  <div>{ productsError?.message }</div>
               </div>
            )

         default:
            return null
      }
      // eslint-disable-next-line
   }, [isLoading, products, productsError])

   return (
      <div className="container">
         <div className={ s.contentTop }>
            <Categories
               onSelectCategory={ onSelectCategory }
               items={ CATEGORIES }
               isLoading={ isLoading }
            />
            <SortPanel items={ SORT_BY_PRICE_ITEMS } onSortClick={ onSortClick }/>
         </div>

         <div className={ s.main }>
            <Sidebar />

            <div className={ s.body }>
               <div className={ s.content }>
                  { renderContent() }
               </div>
               {
                  products.length > 0 ? (
                     <Pagination
                        currentPage={ currentPage }
                        totalPagesCount={ totalPages }
                        onPageClick={ onChangePage }
                     />
                  ) : null
               }
            </div>
         </div>
      </div>
   )
}

export default Home
