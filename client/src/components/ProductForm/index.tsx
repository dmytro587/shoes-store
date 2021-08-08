import React from 'react'
import { Form } from 'react-final-form'

import { Alert, FormControl, Button } from '../index'
import MultiSelect from './MultiSelect'

import { formatOptions, getValuesFromOptions } from './utils'
import { requiredFieldValidator } from '../../utils'

import { Props, Values } from './types'

import s from './ProductForm.module.sass'

const ProductForm: React.FC<Props> = ({ onSubmit = noop, submitText, initialValues }) => {
   const submitHandler = (values: Values) => {
      onSubmit({
         ...values,
         sizes: getValuesFromOptions(values.sizes),
         categories: getValuesFromOptions(values.categories)
      })
   }

   return (
      <Form
         onSubmit={ submitHandler }
         initialValues={ initialValues && {
            ...initialValues,
            categories: formatOptions(CATEGORIES, initialValues.categories),
            sizes: formatOptions(SIZES, initialValues.sizes),
         } }
         validate={ values => requiredFieldValidator(values, ['name', 'price', 'imgUrl', 'sizes', 'categories']) }
         render={ ({ handleSubmit, form, submitting, pristine, }) => (
            <form
               className={ s.form }
               onSubmit={ handleSubmit }
            >
               <Alert />

               <FormControl label="Название" name="name"/>
               <FormControl label="Цена" name="price" type="number"/>
               <FormControl label="URL картинки" name="imgUrl"/>

               <FormControl
                  label="Размеры"
                  name="sizes"
                  component={ MultiSelect }
                  options={ SIZES }
                  placeholder="Выбрать..."
               />

               <FormControl
                  label="Категории"
                  name="categories"
                  component={ MultiSelect }
                  options={ CATEGORIES }
                  placeholder="Выбрать..."
               />

               <Button
                  type="submit"
                  color="black"
                  small
                  className={ s.button } disabled={ submitting || pristine }
               >
                  { submitText || 'Отправить' }
               </Button>
               <Button
                  type="button"
                  handleClick={ form.reset }
                  outline
                  small
                  disabled={ pristine }
               >
                  Сбросить
               </Button>
            </form>
         ) }
      />
   )
}

const noop = () => {}

const SIZES = Array.from({ length: 10 }, (_, i) => ({
   value: 35 + i,
   label: String(35 + i)
}))

const CATEGORIES = [
   { label: 'Ботинки', value: 'boots' },
   { label: 'Кроссовки', value: 'trainers' }
]

export default ProductForm