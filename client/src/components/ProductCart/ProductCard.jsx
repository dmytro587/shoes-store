import { useState } from 'react'

import Button from '../common/Button/Button'
import { SizesList } from '../index'

import * as s from './ProductCard.module.sass'

const ProductCard = ({ id, name, price, imgUrl, sizes, onAddClick, count }) => {
   const [counter, setCounter] = useState(count?.count || count)

   const addHandler = () => {
      onAddClick({
         id, imgUrl,
         sizes, name,
         price
      })
      setCounter(prev => prev + 1)
   }

   return (
      <div>
         <div className={ s.imgWrapper }>
            <img src={ imgUrl } alt="" />
            <div className={ s.overlay }>
               <p>{ name }</p>
            </div>
         </div>

         <div className={ s.footer }>
            <div className={ s.info }>
               <span className={ s.price }>{ price } ₴</span>
               <SizesList sizes={ sizes } />
            </div>

            <Button
               quantity={ counter > 0 && counter }
               onClick={ addHandler }
            >
               Добавить
            </Button>
         </div>
      </div>
   )
}

export default ProductCard