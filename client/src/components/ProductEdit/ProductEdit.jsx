import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { editProduct, fetchProductById } from '../../redux/actions/products'
import { ProductForm } from '../index'

const ProductEdit = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const [product, setProduct] = useState(null)

   useEffect(() => {
      (async () => {
         const product = await fetchProductById(id)
         setProduct(product)
      })()
   }, [])

   const onEdit = data => {
      dispatch(editProduct(id, data))
   }

   return (
      <div className="admin-form-wrapper">
         <h1 className="admin-title">Редактировать товар</h1>

         <ProductForm
            onSubmit={ onEdit }
            submitButtonText="Сохранить изменения"
            initialValues={ product }
         />
      </div>
   )
}

export default ProductEdit