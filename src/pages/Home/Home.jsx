import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addProductToCart } from '../../redux/actions/cart'
import { fetchProducts } from '../../redux/actions/products'
import { setCategory, setSortBy } from '../../redux/actions/filters'

import { getCategory, getSortBy } from '../../redux/selectors/filters'
import { getIsLoading, getProducts } from '../../redux/selectors/products'

import {
   Categories,
   Sort,
   ProductLoader,
   ProductCard,
   Sidebar
} from '../../components'

import * as s from './Home.module.sass'


const sortTypes = [
   { name: 'От дешевых', type: 'price', order: 'desc' },
   { name: 'От дорогих', type: 'price', order: 'asc' }
]

const categoryNames = [
   { name: 'Все', type: 'all' },
   { name: 'Ботинки', type: 'boots' },
   { name: 'Кроссовки', type: 'trainers' }
]


const Home = () => {
   const dispatch = useDispatch()
   const products = useSelector(getProducts)
   const isLoading = useSelector(getIsLoading)
   const sortBy = useSelector(getSortBy)
   const category = useSelector(getCategory)

   useEffect(() => {
      dispatch(fetchProducts(sortBy, category))
      // eslint-disable-next-line
   }, [sortBy, category])

   const onSortClick = sortByObj => {
      dispatch(setSortBy(sortByObj))
   }

   const onSelectCategory = catType => {
      dispatch(setCategory(catType))
   }

   const addProduct = productData => {
      dispatch(addProductToCart(productData))
   }

   const productsList = products.map(product => {
      return (
         <ProductCard
            key={ product.id }
            id={ product.id }
            onAddClick={ addProduct }
            name={ product.name }
            price={ product.price.raw }
            imgUrl={ product.imgUrl }
            variants={ product.variants }
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
               <Sort
                  items={ sortTypes }
                  onSortClick={ onSortClick }
               />
            </div>

            <div className={ s.main }>
               <Sidebar />

               <div className={ s.content }>
                  {
                     isLoading
                     ? Array(10).fill('').map((_, index) => <ProductLoader key={ index } />)
                     : productsList.length > 0
                        ? productsList : <h4>За указанными параметрами ничего не найдено</h4>
                  }
               </div>
            </div>
         </div>

      </div>
   )
}

export default Home