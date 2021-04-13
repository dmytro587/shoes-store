import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addProductToCart } from '../../redux/actions/cart'
import { fetchProducts } from '../../redux/actions/products'
import { setCategory, setCurrentPage, setSortByPrice } from '../../redux/actions/filters'

import { getPriceSort, getSizeSort, getCategorySort, getCurrentPage } from '../../redux/selectors/filters'
import { getIsLoading, getProducts, getTotalPages } from '../../redux/selectors/products'

import {
   Categories, Sort,
   ProductLoader, ProductCard,
   Sidebar, Pagination
} from '../../components'

import * as s from './Home.module.sass'


const sortTypes = [
   { name: 'От дешевых', orderType: 'desc' },
   { name: 'От дорогих', orderType: 'asc' }
]
const categoryNames = [
   { name: 'Все', type: 'all' },
   { name: 'Ботинки', type: 'boots' },
   { name: 'Кроссовки', type: 'trainers' }
]


const Home = () => {
   const dispatch = useDispatch()
   const currentPage = useSelector(getCurrentPage)
   const products = useSelector(getProducts)
   const totalPages = useSelector(getTotalPages)
   const isLoading = useSelector(getIsLoading)
   const priceSort = useSelector(getPriceSort)
   const sizeSort = useSelector(getSizeSort)
   const categorySort = useSelector(getCategorySort)

   useEffect(() => {
      dispatch(fetchProducts({
         price: priceSort,
         sizes: sizeSort,
         category: categorySort
      }, currentPage))
      // eslint-disable-next-line
   }, [priceSort, sizeSort, categorySort, currentPage])

   const onSortClick = sortByObj => {
      dispatch(setSortByPrice(sortByObj))
   }

   const onSelectCategory = category => {
      dispatch(setCategory(category))
   }

   const onChangePage = pageNum => {
      dispatch(setCurrentPage(pageNum))
   }

   const addProduct = productData => {
      dispatch(addProductToCart(productData))
   }

   const productsList = products.map(product => {
      return (
         <ProductCard
            key={ product._id }
            id={ product._id }
            onAddClick={ addProduct }
            name={ product.name }
            price={ product.price }
            imgUrl={ product.imgUrl }
            sizes={ product.sizes }
         />
      )
   })

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
                     {
                        isLoading
                           ? Array(10).fill('').map((_, index) => <ProductLoader key={ index } />)
                           : productsList.length > 0 ? productsList : <h4>За указанными параметрами ничего не найдено</h4>
                     }
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