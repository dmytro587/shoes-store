import { Form } from 'react-final-form'

import Button from '../common/Button/Button'
import { Alert, FormControl } from '../index'

import * as s from './LoginForm.module.sass'
import { Link } from 'react-router-dom'

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

const LoginForm = ({ onSubmit, error, alert }) => {
   const submitHandler = values => {
      onSubmit(values)
   }

   return (
      <Form
         onSubmit={ submitHandler }
         validate={ validate }
         render={ ({ handleSubmit }) => (
            <form className={ s.form } onSubmit={ handleSubmit }>
               { !!alert && <Alert msg={ alert } type="success" /> }
               { !!error && <Alert msg={ error.message } type="error" /> }

               <FormControl label="Ваше имя" name="username" />
               <FormControl label="Email" name="email" type="email" />
               <FormControl label="Пароль" name="password" type="password" />

               <Link to="/reset-password" className={ s.link }>
                  Забыли пароль?
               </Link>
               <Button type="submit" fill black small>Войти</Button>
            </form>
         ) }
      />
   )
}

export default LoginForm