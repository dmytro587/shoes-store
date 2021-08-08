import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from '@hooks'

import { ParamTypes, Product } from '@types'

import { editProduct, fetchProductById } from '@redux/slices/products'
import { ProductForm } from '../index'

const ProductEdit: React.FC = () => {
   const { id } = useParams<ParamTypes>()
   const dispatch = useAppDispatch()
   const [product, setProduct] = useState<Product | null>(null)

   useEffect(() => {
      dispatch(fetchProductById(id)).then(res => setProduct(res.payload as Product))
      // eslint-disable-next-line
   }, [])

   const onEdit = (productData: Product) => {
      dispatch(editProduct({
         productId: id,
         productData
      }))
   }

   return (
      <div className="admin-form-wrapper">
         <h1 className="admin-title">Редактировать товар</h1>

         <ProductForm
            onSubmit={ onEdit }
            submitText="Сохранить изменения"
            initialValues={ product }
         />
      </div>
   )
}

export default ProductEdit