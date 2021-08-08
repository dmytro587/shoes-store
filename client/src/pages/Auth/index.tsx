import React, { useCallback, useEffect } from 'react'
import { NavLink, Route, useHistory } from 'react-router-dom'
import cn from 'classnames'

import {
   selectIsAuthed,
   selectIsRegistered,
   login,
   registration
} from '@redux/slices/auth'

import { LoginForm, RegistrationForm } from './components'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { mainRoutes } from '@navigation/constants'
import { RegistrationData, UserData } from '@types'

import s from './Auth.module.sass'


const { HOME, LOGIN, REGISTRATION } = mainRoutes

const Auth: React.FC = () => {
   const dispatch       = useAppDispatch()
   const history        = useHistory()
   const isAuthed       = useAppSelector(selectIsAuthed)
   const isRegistered   = useAppSelector(selectIsRegistered)

   useEffect(() => {
      if (history.location.pathname.includes(LOGIN) && isAuthed) {
         history.push(HOME)
      }
      // eslint-disable-next-line
   }, [isAuthed])

   useEffect(() => {
      if (isRegistered) {
         history.push(LOGIN)
      }
      // eslint-disable-next-line
   }, [isRegistered])

   const onLogin = useCallback((userData: UserData) => {
      dispatch(login(userData))
      // eslint-disable-next-line
   }, [])

   const onRegister = useCallback((registrationData: RegistrationData) => {
      dispatch(registration(registrationData))
      // eslint-disable-next-line
   }, [])

   const onLinkClick = useCallback((event: React.MouseEvent) => {
      if (isAuthed) event.preventDefault()
      // eslint-disable-next-line
   }, [])

   return (
      <div>
         <header className={ s.header }>
            <NavLink
               to={ LOGIN }
               onClick={ onLinkClick }
               className={ cn(s.link, { [s.disabled]: isAuthed }) }
               activeClassName={ s.active }
            >
               Авторизация
            </NavLink>
            <NavLink
               to={ REGISTRATION }
               className={ s.link }
               activeClassName={ s.active }
            >
               Регистрация
            </NavLink>
         </header>

         <Route exact path={ LOGIN }>
            <LoginForm onSubmit={ onLogin }/>
         </Route>
         <Route exact path={ REGISTRATION }>
            <RegistrationForm onSubmit={ onRegister }/>
         </Route>
      </div>
   )
}

export default Auth