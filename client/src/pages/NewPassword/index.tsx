import React from 'react'
import { Form } from 'react-final-form'
import { useParams } from 'react-router-dom'

import { useAppDispatch } from '@hooks'
import { newPassword } from '@redux/slices/auth'

import { Alert, FormControl, Button } from '@components'

import s from './NewPassword.module.sass'


interface Values {
   password: string
   confirm: string
}

const NewPassword: React.FC = () => {
   const dispatch = useAppDispatch()
   const { token } = useParams<{ token: string }>()

   const submitHandler = (values: Values) => {
      const { password, confirm } = values

      dispatch(newPassword({
         newPassword: password,
         confirm,
         token
      }))
   }

   return (
      <Form
         onSubmit={ submitHandler }
         validate={ validate }
         render={ ({ handleSubmit }) => (
            <form className={ s.form } onSubmit={ handleSubmit }>
               <h1 className={ s.title }>Введите новый пароль</h1>

               <Alert />

               <FormControl label="Новый пароль" name="password" type="password" className={ s.input } />
               <FormControl label="Повторите пароль" name="confirm" type="password" className={ s.input } />

               <Button type="submit" color="black" small>Сохранить</Button>
            </form>
         ) }
      />
   )
}

const validate = (values: Values) => {
   const errors = {} as Record<keyof Values, string>

   if (!values.password) {
      errors.password = '*поле обязательно'
   } else if (!values.confirm) {
      errors.confirm = '*поле обязательно'
   }

   return errors
}

export default NewPassword