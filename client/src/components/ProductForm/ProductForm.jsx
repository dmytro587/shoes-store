import { Form } from 'react-final-form'
import Select from 'react-select'

import { Alert, FormControl, Button } from '../index'
import { requiredFieldValidator } from '../../utils'

import * as s from './ProductForm.module.sass'

const ProductForm = ({ onSubmit = noop, submitButtonText, initialValues }) => {
   const submitHandler = values => {
      onSubmit({
         ...values,
         sizes: getMappedValues(values.sizes),
         categories: getMappedValues(values.categories)
      })
   }

   return (
      <Form
         onSubmit={ submitHandler }
         initialValues={ initialValues && {
            ...initialValues,
            categories: categories.find(item => item.value === initialValues.categories[0]),
            sizes: sizes.find(item => item.value === initialValues.sizes[0]),
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
                  options={ sizes }
                  placeholder="Выбрать..."
               />

               <FormControl
                  label="Категории"
                  name="categories"
                  component={ MultiSelect }
                  options={ categories }
                  placeholder="Выбрать..."
               />

               <Button
                  type="submit"
                  color="black"
                  small
                  className={ s.button } disabled={ submitting || pristine }
               >
                  { submitButtonText || 'Отправить' }
               </Button>
               <Button
                  type="button"
                  onClick={ form.reset }
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

const sizes = Array.from({ length: 10 }, (_, i) => ({
   value: 35 + i,
   label: String(35 + i)
}))

const categories = [
   { label: 'Ботинки', value: 'boots' },
   { label: 'Кроссовки', value: 'trainers' }
]

const getMappedValues = values => {
   if (Array.isArray(values)) {
      return values.map(item => item.value ? item.value : item)
   } else if (typeof values === 'object') {
      return values.value
   }
}

const MultiSelect = ({ input, ...rest }) => (
   <Select isMulti { ...input } { ...rest }/>
)

export default ProductForm
