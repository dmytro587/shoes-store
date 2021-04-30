import { Form } from 'react-final-form'
import { useDispatch } from 'react-redux'

import { resetPassword } from '../../redux/actions/auth'

import { Alert, FormControl, Button } from '../../components'

import * as s from './ResetPassword.module.sass'


const validate = values => {
   const errors = {}

   if (!values.email) {
      errors.email = '*поле обязательно'
   }

   return errors
}

const ResetPassword = () => {
   const dispatch = useDispatch()

   const submitHandler = values => {
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

               <Button type="submit" fill black small>Продолжить</Button>
            </form>
         ) }
      />
   )
}

export default ResetPassword