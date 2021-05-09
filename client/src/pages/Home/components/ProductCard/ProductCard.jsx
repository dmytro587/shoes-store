import { useState } from 'react'
import { useSelector } from 'react-redux'

import { getAddingState } from '../../../../redux/selectors/cart'

import Loader from 'react-loader-spinner'
import { Button } from '../../../../components'
import SizesList from '../SizesList/SizesList'

import * as s from './ProductCard.module.sass'


const ProductCard = ({ id, name, price, imgUrl, sizes, onAddClick, count }) => {
   const [counter, setCounter] = useState(count?.count || count)
   const addingState = useSelector(getAddingState)

   const addHandler = () => {
      onAddClick(id)
      setCounter(prev => prev + 1)
   }

   return (
      <div>
         <div className={ s.imgWrapper }>
            <img src={ imgUrl } alt=""/>
            <div className={ s.overlay }>
               <p>{ name }</p>
            </div>
         </div>

         <div className={ s.footer }>
            <div className={ s.info }>
               <span className={ s.price }>{ price } ₴</span>
               <SizesList sizes={ sizes }/>
            </div>

            <Button
               fill
               small
               quantity={ counter > 0 && counter }
               className={s.btn}
               onClick={ addHandler }
            >
               {
                  addingState.some(itemId => itemId === id) ? (
                     <Loader
                        className={ s.loader }
                        type="Oval"
                        color="#fff"
                        height={ 15 }
                        width={ 15 }
                     />
                  ) : (
                     <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                           d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                           fill="white"
                        />
                     </svg>
                  )
               }
               <span>Добавить</span>
            </Button>
         </div>
      </div>
   )
}

export default ProductCard