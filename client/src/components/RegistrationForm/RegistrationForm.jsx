import { Form } from 'react-final-form'

import Button from '../common/Button/Button'
import { Alert, FormControl } from '../index'

import * as s from './RegistrationForm.module.sass'


const validate = values => {
   const errors = {}

   if (!values.username) {
      errors.username = '*поле обязательно'
   }
   if (!values.email) {
      errors.email = '*поле обязательно'
   }
   if (!values.password) {
      errors.password = '*поле обязательно'
   }
   if (!values.confirm) {
      errors.confirm = '*поле обязательно'
   }

   return errors
}


const RegistrationForm = ({ onSubmit, error }) => {
   const submitHandler = values => {
      onSubmit(values)
   }

   return (
      <Form
         onSubmit={ submitHandler }
         validate={ validate }
         render={ ({ handleSubmit }) => (
            <form className={ s.form } onSubmit={ handleSubmit }>

               { !!error && <Alert msg={ error.message } type="error" /> }

               <FormControl label="Ваше имя" name="username" />
               <FormControl label="Email" name="email" type="email" />
               <FormControl label="Пароль" name="password" type="password" />
               <FormControl label="Повторите пароль" name="confirm" type="password" />

               <Button type="submit" fill black small>Зарегистрироваться</Button>
            </form>
         ) }
      />
   )
}

export default RegistrationForm