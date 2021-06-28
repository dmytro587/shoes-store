import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '../../redux/actions/auth'
import { getTotalCount, getTotalPrice } from '../../redux/selectors/cart'
import { getIsAuthed } from '../../redux/selectors/auth'
import { Button } from '../index'

import cartSvg from './../../assets/images/basket.svg'
import logoSvg from './../../assets/images/logo.svg'

import * as s from './Header.module.sass'

const AuthLink = () => (
   <Link to="/auth/login" className={ s.text }>
      <Button color="black" small>Войти</Button>
   </Link>
)

const Header = () => {
   const dispatch = useDispatch()
   const price = useSelector(getTotalPrice)
   const count = useSelector(getTotalCount)
   const isAuthed = useSelector(getIsAuthed)

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
                        <span>{ price } ₴</span>
                        <span className={ s.count }>
                           <img src={ cartSvg } alt=""/>
                           { count }
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