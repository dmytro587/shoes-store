import React from 'react'
import { Form } from 'react-final-form'
import { Link } from 'react-router-dom'

import { UserData } from '@types'
import { Alert, Button, FormControl } from '@components'

import { requiredFieldValidator } from '@utils'

import s from './LoginForm.module.sass'


interface Props {
   onSubmit: (values: UserData) => void
}

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
   const submitHandler = (values: UserData) => {
      onSubmit(values)
   }

   return (
      <Form
         onSubmit={ submitHandler }
         validate={ values => requiredFieldValidator(values, ['username', 'email', 'password']) }
         render={ ({ handleSubmit }) => (
            <form className={ s.form } onSubmit={ handleSubmit }>
               <Alert/>

               <FormControl label="Ваше имя" name="username"/>
               <FormControl label="Email" name="email" type="email"/>
               <FormControl label="Пароль" name="password" type="password"/>

               <Link to="/reset-password" className={ s.link }>
                  Забыли пароль?
               </Link>

               <Button type="submit" color="black" small>Войти</Button>
            </form>
         ) }
      />
   )
}

export default LoginForm