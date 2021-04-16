import { Form } from 'react-final-form'

import Button from '../common/Button/Button'
import { Alert, FormControl } from '../index'

import * as s from './LoginForm.module.sass'

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

   return errors
}

const LoginForm = ({ onSubmit, error }) => {
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

               <Button type="submit" fill black small>Войти</Button>
            </form>
         ) }
      />
   )
}

export default LoginForm