import { Link } from 'react-router-dom'

import { Button } from '../../../../components'

import emptySvg from './../../../../assets/images/empty-cart.svg'
import * as s from './EmptyCart.module.sass'

const EmptyCart = () => {
   return (
      <div className={ s.emptyCart }>
         <h1>Корзина пустая 😕</h1>
         <img src={ emptySvg } alt=""/>
         <Link to="/home">
            <Button color="black">Вернуться назад</Button>
         </Link>
      </div>
   )
}

export default EmptyCart