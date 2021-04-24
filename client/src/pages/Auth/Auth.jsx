import { useEffect } from 'react'
import { NavLink, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'

import { login, registration } from '../../redux/actions/auth'
import { getAlert, getError, getIsAuthed, getIsRegistered } from '../../redux/selectors/auth'
import { LoginForm, RegistrationForm } from '../../components'

import * as s from './Auth.module.sass'
import { ErrorBoundary } from '../../hoc'

const Auth = () => {
   const dispatch = useDispatch()
   const history = useHistory()
   const isAuthed = useSelector(getIsAuthed)
   const error = useSelector(getError)
   const alert = useSelector(getAlert)
   const isRegistered = useSelector(getIsRegistered)

   useEffect(() => {
      if (history.location.pathname.includes('/auth/login') && isAuthed) {
         history.push('/home')
      }
      // eslint-disable-next-line
   }, [isAuthed])

   useEffect(() => {
      if (isRegistered) {
         history.push('/auth/login')
      }
      // eslint-disable-next-line
   }, [isRegistered])

   const onLogin = values => {
      dispatch(login(values))
   }

   const onRegister = values => {
      dispatch(registration(values))
   }

   const onLinkClick = e => {
      if (isAuthed) e.preventDefault()
   }

   return (
      <div>
         <header className={ s.header }>
            <NavLink
               to="/auth/login"
               onClick={ onLinkClick }
               className={ cn(s.link, { [s.disabled]: isAuthed }) }
               activeClassName={ s.active }
            >
               Авторизация
            </NavLink>
            <NavLink
               to="/auth/registration"
               className={ s.link }
               activeClassName={ s.active }
            >
               Регистрация
            </NavLink>
         </header>

         <Route exact path="/auth/login">
            <ErrorBoundary errorMsg="Что-то пошло не так">
               <LoginForm alert={ alert } error={ error } onSubmit={ onLogin }/>
            </ErrorBoundary>
         </Route>
         <Route exact path="/auth/registration">
            <ErrorBoundary errorMsg="Что-то пошло не так">
               <RegistrationForm error={ error } onSubmit={ onRegister }/>
            </ErrorBoundary>
         </Route>
      </div>
   )
}

export default Auth