import { Form } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

import { getAlert, getError } from '../../redux/selectors/auth'
import { newPassword } from '../../redux/actions/auth'

import { Alert, FormControl, Button } from '../../components'

import * as s from './NewPassword.module.sass'


const validate = values => {
   const errors = {}

   if (!values.password) {
      errors.password = '*поле обязательно'
   } else if (!values.confirm) {
      errors.confirm = '*поле обязательно'
   }

   return errors
}

const NewPassword = () => {
   const dispatch = useDispatch()
   const params = useParams()
   const history = useHistory()
   const error = useSelector(getError)
   const alert = useSelector(getAlert)

   const submitHandler = values => {
      const { password, confirm } = values
      dispatch(newPassword(password, confirm, params.token))
      history.push('/auth/login')
   }

   return (
      <Form
         onSubmit={ submitHandler }
         validate={ validate }
         render={ ({ handleSubmit }) => (
            <form className={ s.form } onSubmit={ handleSubmit }>
               <h1 className={ s.title }>Введите новый пароль</h1>

               { !!alert && <Alert msg={ alert } type="success" /> }
               { !!error && <Alert msg={ error.message } type="error" /> }

               <FormControl label="Новый пароль" name="password" type="password" className={ s.input } />
               <FormControl label="Повторите пароль" name="confirm" type="password" className={ s.input } />

               <Button type="submit" fill black small>Сохранить</Button>
            </form>
         ) }
      />
   )
}

export default NewPassword