import { Form } from 'react-final-form'
import Select from 'react-select'

import { Alert, FormControl, Button } from '../index'
import { requiredFieldValidator } from '../../utils'

import * as s from './AddProductForm.module.sass'


const sizes = Array.from({ length: 10 }, (_, i) => ({
   value: 35 + i,
   label: String(35 + i)
}))

const categories = [
   { label: 'Ботинки', value: 'boots' },
   { label: 'Кроссовки', value: 'trainers' }
]

const getMappedValues = values => Array.isArray(values) ? values.map(item => item.value ? item.value : item) : values

const MultiSelect = ({ input, ...rest }) => (
   <Select isMulti { ...input } { ...rest }/>
)

const AddProductForm = ({ onSubmit = () => {} }) => {

   const submitHandler = async values => {
      onSubmit({
         ...values,
         sizes: getMappedValues(values.sizes),
         categories: getMappedValues(values.categories)
      })
   }

   return (
      <Form
         onSubmit={ submitHandler }
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

               <Button type="submit" fill black small className={ s.button } disabled={ submitting || pristine }>
                  Добавить товар
               </Button>
               <Button type="button" onClick={ form.reset } outline small disabled={ pristine }>
                  Сбросить
               </Button>
            </form>
         ) }
      />
   )
}

export default AddProductForm
