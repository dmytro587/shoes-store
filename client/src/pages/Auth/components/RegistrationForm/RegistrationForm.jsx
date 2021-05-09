import { Form } from 'react-final-form'

import { Alert, Button, FormControl } from '../../../../components'

import { requiredFieldValidator } from '../../../../utils'

import * as s from './RegistrationForm.module.sass'


const RegistrationForm = ({ onSubmit}) => {
   const submitHandler = values => {
      onSubmit(values)
   }

   return (
      <Form
         onSubmit={ submitHandler }
         validate={ values => requiredFieldValidator(values, ['username', 'email', 'password', 'confirm']) }
         render={ ({ handleSubmit }) => (
            <form className={ s.form } onSubmit={ handleSubmit }>
               <Alert />

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