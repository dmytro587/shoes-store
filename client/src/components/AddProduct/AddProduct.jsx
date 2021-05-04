import { useDispatch } from 'react-redux'

import { addProduct } from '../../redux/actions/products'
import { ProductForm } from '../index'

const AddProduct = () => {
   const dispatch = useDispatch()

   const onAddProduct = formData => {
      dispatch(addProduct(formData))
   }

   return (
      <div className="admin-form-wrapper">
         <h1 className="admin-title">Добавить товар</h1>

         <ProductForm onSubmit={ onAddProduct } submitButtonText="Добавить товар" />
      </div>
   )
}

export default AddProduct