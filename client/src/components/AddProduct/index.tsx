import React from 'react'

import { addProduct } from '../../redux/slices/products'
import { ProductForm } from '../index'

import { useAppDispatch } from '../../hooks'
import { Product } from '../../types'

const AddProduct: React.FC = () => {
   const dispatch = useAppDispatch()

   const onAddProduct = (productData: Product) => (
      dispatch(addProduct(productData))
   )

   return (
      <div className="admin-form-wrapper">
         <h1 className="admin-title">Добавить товар</h1>

         <ProductForm
            onSubmit={ onAddProduct }
            submitText="Добавить товар"
         />
      </div>
   )
}

export default AddProduct