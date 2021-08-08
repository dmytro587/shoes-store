import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '@hooks'

import {
   selectIsLoaded,
   selectProducts,
   selectRemovingState,
   selectTotalCount,
   selectTotalPrice,
   clearCart,
   fetchCart,
   minusItemCount,
   plusItemCount,
   removeProductFromCart,
} from '@redux/slices/cart'


import { Button } from '@components'
import { CartItem, CartItemLoader, EmptyCart } from './components'
import { ErrorBoundary } from '@hoc'

import grayLogoSvg from '@assets/images/gray-basket.svg'
import trashSvg from '@assets/images/trash.svg'
import arrowLeftSvg from '@assets/images/arrow-left.svg'
import s from './Cart.module.sass'


const Cart: React.FC = () => {
   const dispatch       = useAppDispatch()
   const products       = useAppSelector(selectProducts)
   const totalPrice     = useAppSelector(selectTotalPrice)
   const totalCount     = useAppSelector(selectTotalCount)
   const removingState  = useAppSelector(selectRemovingState)
   const isLoaded       = useAppSelector(selectIsLoaded)

   useEffect(() => {
      dispatch(fetchCart())
      // eslint-disable-next-line
   }, [])

   if ((products.length === 0) && isLoaded) {
      return <EmptyCart />
   }

   const removeItem = (productId: string) =>
      dispatch(removeProductFromCart(productId))

   const onPlusItem = (productId: string) =>
      dispatch(plusItemCount(productId))

   const onMinusItem = (productId: string) =>
      dispatch(minusItemCount(productId))

   const onClearCart = () =>
      dispatch(clearCart())

   const items = products.map(product => (
      <ErrorBoundary empty key={ product._id }>
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
               <Button>Оплатить сейчас</Button>
            </div>
         </div>
      </div>
   )
}

export default Cart