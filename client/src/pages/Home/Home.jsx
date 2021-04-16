import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addProductToCart, fetchCartInfo } from '../../redux/actions/cart'
import { fetchProducts } from '../../redux/actions/products'
import { setCategory, setCurrentPage, setSortByPrice } from '../../redux/actions/filters'

import { getPriceSort, getSizeSort, getCategorySort, getCurrentPage } from '../../redux/selectors/filters'
import { getError, getIsLoading, getProducts, getTotalPages } from '../../redux/selectors/products'
import { getIsAuthed } from '../../redux/selectors/auth'


import {
   Categories, Sort,
   ProductLoader, ProductCard,
   Sidebar, Pagination
} from '../../components'
import { sortTypes, categoryNames } from './../../config'

import * as s from './Home.module.sass'


const Home = () => {
   const dispatch = useDispatch()
   const isAuthed = useSelector(getIsAuthed)
   const currentPage = useSelector(getCurrentPage)
   const products = useSelector(getProducts)
   const totalPages = useSelector(getTotalPages)
   const isLoading = useSelector(getIsLoading)
   const priceSort = useSelector(getPriceSort)
   const sizeSort = useSelector(getSizeSort)
   const categorySort = useSelector(getCategorySort)
   const error = useSelector(getError)

   useEffect(() => {
      dispatch(fetchCartInfo())
      // eslint-disable-next-line
   }, [])

   useEffect(() => {
      dispatch(fetchProducts({
         price: priceSort,
         sizes: sizeSort,
         category: categorySort
      }, currentPage))
      // eslint-disable-next-line
   }, [priceSort, sizeSort, categorySort, currentPage, isAuthed])

   const onSortClick = sortByObj => {
      dispatch(setSortByPrice(sortByObj))
   }

   const onSelectCategory = category => {
      dispatch(setCategory(category))
   }

   const onChangePage = pageNum => {
      dispatch(setCurrentPage(pageNum))
   }

   const addToCartHandler = productId => {
      dispatch(addProductToCart(productId)).then(() => {
         dispatch(fetchCartInfo())
      })
   }

   const productsList = products.map(product => {
      return (
         <ProductCard
            key={ product._id }
            id={ product._id }
            onAddClick={ addToCartHandler }
            name={ product.name }
            price={ product.price }
            imgUrl={ product.imgUrl }
            sizes={ product.sizes }
         />
      )
   })

   const getContent = () => {
      switch(true) {
         case isLoading:
            return Array(10).fill('').map((_, index) => <ProductLoader key={ index } />)
         case productsList.length > 0:
            return productsList
         case !error:
            return <h4>За указанными параметрами ничего не найдено</h4>
         case !!error:
            return (
               <div className={s.error}>
                  <h2>Ошибка <span>{error.status}</span></h2>
                  <div>{error.message}</div>
               </div>
            )
         default: return null
      }
   }

   return (
      <div>
         <div className="container">
            <div className={ s.contentTop }>
               <Categories
                  onSelectCategory={ onSelectCategory }
                  items={ categoryNames }
                  isLoading={ isLoading }
               />
               <Sort items={ sortTypes } onSortClick={ onSortClick } />
            </div>

            <div className={ s.main }>
               <Sidebar />

               <div className={ s.body }>
                  <div className={ s.content }>
                     { getContent() }
                  </div>
                  {
                     productsList.length > 0
                        ? <Pagination
                              currentPage={ currentPage }
                              count={ totalPages }
                              onPageClick={ onChangePage }
                          />
                        : null
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default Home