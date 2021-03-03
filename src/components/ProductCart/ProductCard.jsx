import { useState } from 'react'

import Button from '../common/Button/Button'
import { SizesList } from '../index'

import * as s from './ProductCard.module.sass'

const ProductCard = ({ id, name, price, imgUrl, variants: { sizes }, onAddClick, count }) => {
   const [counter, setCounter] = useState(count?.count || count)
   const [activeSize, setActiveSize] = useState(null)

   const onChangeSize = size => {
      setActiveSize(size)
   }

   const addHandler = () => {
      onAddClick({
         id,
         imgUrl,
         sizes,
         name,
         price,
         selectedSize: activeSize
      })
      setCounter(prev => prev + 1)
   }

   return (
      <div className={ s.wrapper }>
         <div className={ s.imgWrapper }>
            <img src={ imgUrl } alt="" />

            <div className={ s.overlay }>
               <p>{ name }</p>
            </div>
         </div>

         <div className={ s.footer }>
            <div className={ s.info }>
               <span className={ s.price }>{ price } ₴</span>
               <form className={ s.sizes }>
                  <SizesList
                     sizes={ sizes }
                     onSelectSize={ size => onChangeSize(size) }
                  />
               </form>
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