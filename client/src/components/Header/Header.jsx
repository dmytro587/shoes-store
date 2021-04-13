import { Link, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getTotalItems, getTotalPrice } from '../../redux/selectors/cart'

import cartSvg from './../../assets/images/basket.svg'
import logoSvg from './../../assets/images/logo.svg'

import * as s from './Header.module.sass'

const Header = () => {
   const price = useSelector(getTotalPrice)
   const count = useSelector(getTotalItems)

   return (
      <div className={ s.header }>
         <Link to="/home">
            <img src={ logoSvg } alt=""/>
         </Link>

         <Route path="/home">
            <Link to="/cart" className={ s.basket }>
               <span>{ price } ₴</span>
               <span className={ s.count }>
                  <img src={ cartSvg } alt=""/>
                  { count }
               </span>
            </Link>
         </Route>
      </div>
   )
}

export default Header