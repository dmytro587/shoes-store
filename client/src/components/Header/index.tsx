import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks'

import { selectIsAuthed } from '../../redux/slices/auth'
import { selectTotalCount, selectTotalPrice } from '../../redux/slices/cart'
import { logout } from '../../redux/slices/auth'

import { Button } from '../index'

import cartSvg from './../../assets/images/basket.svg'
import logoSvg from './../../assets/images/logo.svg'

import s from './Header.module.sass'


const AuthLink = () => (
   <Link to="/auth/login" className={ s.text }>
      <Button color="black" small>Войти</Button>
   </Link>
)

const Header: React.FC = () => {
   const dispatch = useAppDispatch()
   const totalPrice = useAppSelector(selectTotalPrice)
   const totalCount = useAppSelector(selectTotalCount)
   const isAuthed = useAppSelector(selectIsAuthed)

   const onLogout = () => {
      dispatch(logout())
   }

   return (
      <div className={ s.header }>
         <Link to="/home">
            <img src={ logoSvg } alt=""/>
         </Link>

         {
            isAuthed ? (
               <div className={ s.right }>
                  <span className={ s.logout } onClick={ onLogout }>
                     Выйти
                  </span>
                  <Route path="/home">
                     <span className={ s.separator }/>
                     <Link to="/cart" className={ s.basket }>
                        <span>{ totalPrice } ₴</span>
                        <span className={ s.count }>
                           <img src={ cartSvg } alt=""/>
                           { totalCount }
                        </span>
                     </Link>
                  </Route>
               </div>
            ) : (
               <Switch>
                  <Route path="/home" component={ AuthLink }/>
                  <Route exact path="/" component={ AuthLink }/>
               </Switch>
            )
         }
      </div>
   )
}

export default Header