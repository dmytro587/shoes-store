import React, { Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Loader from 'react-loader-spinner'

import { useAppDispatch, useAppSelector } from '../../hooks'

import {
   selectIsLoading,
   selectProducts,
   selectTotalCount,
   selectTotalPages,
   fetchProducts,
   removeProduct
} from '@redux/slices/products'
import { selectCurrentPage, setCurrentPage } from '@redux/slices/filters'

import { ProductItem } from './components'
import { Alert, Pagination } from '@components'

import s from './ProductsList.module.sass'


const ProductsList: React.FC = () => {
   const history = useHistory()
   const dispatch = useAppDispatch()

   const products = useAppSelector(selectProducts)
   const currentPage = useAppSelector(selectCurrentPage)
   const totalPages = useAppSelector(selectTotalPages)
   const totalCount = useAppSelector(selectTotalCount)
   const isLoading = useAppSelector(selectIsLoading)

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
            // @ts-ignore
            className="fill-spinner"
         />
      )
   }

   const onChangePage = (num: number) => {
      dispatch(setCurrentPage(num))
   }

   const onRemoveClick = (productId: string) => {
      dispatch(removeProduct(productId))
   }

   const onEditClick = (productId: string) => {
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
                     <ProductItem
                        key={ item._id }
                        id={ item._id as string }
                        name={ item.name }
                        imgUrl={ item.imgUrl }
                        onRemove={ onRemoveClick }
                        onEdit={ onEditClick }
                     />
                  )) : (
                     <Loader
                        type="Oval"
                        color="#000"
                        height={ 60 }
                        width={ 60 }
                        // @ts-ignore
                        className={ s.loader }
                     />
                  )
               }
            </div>
         </div>

         <Pagination
            totalPagesCount={ totalPages }
            currentPage={ currentPage }
            onPageClick={ onChangePage }
            className={ s.pagination }
         />
      </Fragment>
   )
}

export default ProductsList