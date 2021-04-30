import { useDispatch } from 'react-redux'

import { addProduct } from '../../redux/actions/products'
import { AddProductForm } from '../index'

import * as s from './AddProduct.module.sass'


const AddProduct = () => {
   const dispatch = useDispatch()

   const onAddProduct = formData => {
      dispatch(addProduct(formData))
   }

   return (
      <div className={ s.wrapper }>
         <h1 className={ s.title }>Добавить товар</h1>

         <AddProductForm onSubmit={ onAddProduct } />
      </div>
   )
}

export default AddProduct