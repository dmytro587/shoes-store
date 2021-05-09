import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
   clearCart,
   fetchCart,
   minusItemCount,
   plusItemCount,
   removeItemFromCart,
} from '../../redux/actions/cart'
import {
   getIsLoaded,
   getProducts,
   getRemovingState,
   getTotalCount,
   getTotalPrice
} from '../../redux/selectors/cart'

import { Button } from '../../components'
import { CartItem, CartItemLoader, EmptyCart } from './components'
import { ErrorBoundary } from '../../hoc'

import grayLogoSvg from './../../assets/images/gray-basket.svg'
import trashSvg from './../../assets/images/trash.svg'
import arrowLeftSvg from './../../assets/images/arrow-left.svg'

import * as s from './Cart.module.sass'


const Cart = () => {
   const dispatch = useDispatch()
   const products = useSelector(getProducts)
   const totalPrice = useSelector(getTotalPrice)
   const totalCount = useSelector(getTotalCount)
   const removingState = useSelector(getRemovingState)
   const isLoaded = useSelector(getIsLoaded)

   useEffect(() => {
      dispatch(fetchCart())
      // eslint-disable-next-line
   }, [])

   if ((products.length === 0) && isLoaded) {
      return <EmptyCart />
   }

   const removeItem = itemId => {
      dispatch(removeItemFromCart(itemId))
   }

   const onPlusItem = itemId => {
      dispatch(plusItemCount(itemId))
   }

   const onMinusItem = itemId => {
      dispatch(minusItemCount(itemId))
   }

   const onClearCart = () => {
      dispatch(clearCart())
   }

   const items = products.map(product => (
      <ErrorBoundary isEmpty key={ product._id }>
         <CartItem
            id={ product._id }
            onPlusItemCount={ onPlusItem }
            onMinusItemCount={ onMinusItem }
            onRemoveItem={ removeItem }
            name={ product.name }
            imgUrl={ product.imgUrl }
            price={ product.totalPrice }
            count={ product.count }
            removingState={ removingState }
         />
      </ErrorBoundary>
   ))

   return (
      <div>
         <div className="container--cart">
            <div className={ s.cartTop }>
               <img src={ grayLogoSvg } alt=""/>
               <h2 className={ s.title }>Корзина</h2>
               <div
                  className={ s.trash }
                  onClick={ onClearCart }
               >
                  <img src={ trashSvg } alt=""/>
                  Очистить корзину
               </div>
            </div>

            <div className={ s.items }>
               {
                  !isLoaded
                     ? Array(3)
                        .fill('')
                        .map((_, index) => <CartItemLoader key={ index } />)
                     : items
               }
            </div>

            <div className={ s.totalInfo }>
               <span>
                  Всего товаров: <strong>{ totalCount } шт.</strong>
               </span>
               <span>
                  Сумма заказа: <strong className={ s.totalPrice }>{ totalPrice } ₴</strong>
               </span>
            </div>

            <div className={ s.buttons }>
               <Link to="/home" className={ s.link }>
                  <Button outline>
                     <img src={ arrowLeftSvg } alt=""/>
                     Вернуться назад
                  </Button>
               </Link>
               <Button fill>Оплатить сейчас</Button>
            </div>
         </div>
      </div>
   )
}

export default Cart