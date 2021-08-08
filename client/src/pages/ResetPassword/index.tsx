import React from 'react'
import { Form } from 'react-final-form'

import { useAppDispatch } from '../../hooks'
import { resetPassword } from '../../redux/slices/auth'

import { Alert, FormControl, Button } from '../../components'

import s from './ResetPassword.module.sass'


interface Values { email: string }

const ResetPassword: React.FC = () => {
   const dispatch = useAppDispatch()

   const submitHandler = (values: Values) => {
      dispatch(resetPassword(values.email))
   }

   return (
      <Form
         onSubmit={ submitHandler }
         validate={ validate }
         render={ ({ handleSubmit }) => (
            <form className={ s.form } onSubmit={ handleSubmit }>
               <p className={ s.text }>
                  При помощи данной формы вы можете сбросить ваш текущий пароль.
                  После отправки формы, вы получите письмо с просьбой о подтверждении запроса, а так же ссылкой на дальнейшие инструкции.
               </p>

               <Alert />
               <FormControl label="Email" name="email" type="email" className={ s.input } />
               <Button type="submit" color="black" small>Продолжить</Button>
            </form>
         ) }
      />
   )
}

const validate = (values: Values) => {
   const errors = {} as { [x: string]: string }

   if (!values.email) {
      errors.email = '*поле обязательно'
   }

   return errors
}

export default ResetPassword