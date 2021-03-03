import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
   clearCart,
   minusItemCount,
   plusItemCount,
   removeItemFromCart,
   setProductSize
} from '../../redux/actions/cart'
import {
   getProducts,
   getRemovingState,
   getTotalItems,
   getTotalPrice
} from '../../redux/selectors/cart'
import {
   Button,
   CartItem,
   CartItemLoader,
   EmptyCart
} from '../../components'

import grayLogoSvg from './../../assets/images/gray-basket.svg'
import trashSvg from './../../assets/images/trash.svg'
import arrowLeftSvg from './../../assets/images/arrow-left.svg'

import * as s from './Cart.module.sass'


const Cart = () => {
   const dispatch = useDispatch()
   const products = useSelector(getProducts)
   const totalPrice = useSelector(getTotalPrice)
   const totalItems = useSelector(getTotalItems)
   const removingState = useSelector(getRemovingState)

   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const timeout = setTimeout(() => setIsLoading(false), 1000)

      return () => clearTimeout(timeout)
   }, [])

   if (products.length === 0) {
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
      dispatch(clearCart)
   }

   const onSelectSize = (id, size) => {
      dispatch(setProductSize(id, size))
   }

   const items = products.map(product => (
      <CartItem
         key={ product.id }
         id={ product.id }
         onPlusItem={ onPlusItem }
         onMinusItem={ onMinusItem }
         onRemoveItem={ removeItem }
         onSelectSize={ onSelectSize }
         name={ product.name }
         imgUrl={ product.imgUrl }
         sizes={ product.sizes }
         selectedSize={ product.selectedSize }
         price={ product.totalPrice }
         count={ product.count }
         removingState={ removingState }
      />
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
                  isLoading
                  ? Array(3).fill('').map((_, index) => <CartItemLoader key={ index } />)
                  : items
               }
            </div>

            <div className={ s.totalInfo }>
               <span>
                  Всего товаров: <strong>{ totalItems } шт.</strong>
               </span>
               <span>
                  Сумма заказа: <strong className={ s.totalPrice }>{ totalPrice } ₴</strong>
               </span>
            </div>

            <div className={ s.buttons }>
               <Link to="/" className={ s.link }>
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