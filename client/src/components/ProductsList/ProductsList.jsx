import { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import { fetchProducts, removeProduct } from '../../redux/actions/products'
import { getIsLoading, getProducts, getTotalCount, getTotalPages } from '../../redux/selectors/products'
import { getCurrentPage } from '../../redux/selectors/filters'
import { setCurrentPage } from '../../redux/actions/filters'

import { Alert, Pagination, ProductsListItem } from '../index'

import * as s from './ProductsList.module.sass'


const ProductsList = () => {
   const history = useHistory()
   const dispatch = useDispatch()
   const products = useSelector(getProducts)
   const currentPage = useSelector(getCurrentPage)
   const totalPages = useSelector(getTotalPages)
   const totalCount = useSelector(getTotalCount)
   const isLoading = useSelector(getIsLoading)

   useEffect(() => {
      dispatch(fetchProducts(8))
      // eslint-disable-next-line
   }, [totalCount, currentPage])


   if (isLoading && !products.length) {
      return (
         <Loader
            type="Oval"
            color="#000"
            height={ 60 }
            width={ 60 }
            className="fill-spinner"
         />
      )
   }

   const onChangePage = num => {
      dispatch(setCurrentPage(num))
   }

   const onRemoveClick = productId => {
      dispatch(removeProduct(productId))
   }

   const onEditClick = productId => {
      history.push(`/admin/edit/${ productId }`)
   }

   return (
      <Fragment>
         <Alert/>

         <div className={ s.wrapper }>
            <div className={ s.header }>
               <span>Товар</span>
               <span>Действия</span>
            </div>

            <div>
               {
                  !isLoading ? products.map(item => (
                     <ProductsListItem
                        key={ item._id }
                        id={ item._id }
                        name={ item.name }
                        imgUrl={ item.imgUrl }
                        onRemoveClick={ onRemoveClick }
                        onEditClick={ onEditClick }
                     />
                  )) : (
                     <Loader
                        type="Oval"
                        color="#000"
                        height={ 60 }
                        width={ 60 }
                        className={ s.loader }
                     />
                  )
               }
            </div>
         </div>

         <Pagination
            totalCount={ totalPages }
            currentPage={ currentPage }
            onPageClick={ onChangePage }
            className={ s.pagination }
         />
      </Fragment>
   )
}

export default ProductsList