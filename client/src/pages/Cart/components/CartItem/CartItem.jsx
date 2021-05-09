import Loader from 'react-loader-spinner'

import minusSvg from './../../../../assets/images/minus.svg'
import plusSvg from './../../../../assets/images/plus.svg'
import removeSvg from './../../../../assets/images/remove.svg'

import * as s from './CartItem.module.sass'

const CartItem = ({
   id,
   name,
   imgUrl,
   price,
   count,
   removingState,
   onRemoveItem,
   onPlusItemCount,
   onMinusItemCount,
}) => {

   return (
      <div className={ s.wrapper }>

         <div className={ s.infoBlock }>
            <div className={ s.imgWrapper }>
               <img src={ imgUrl } alt=""/>
            </div>

            <div className={ s.info }>
               <h4>{ name }</h4>
            </div>
         </div>

         <div className={ s.counter }>
            <button onClick={ () => onMinusItemCount(id) }>
               <img src={ minusSvg } alt=""/>
            </button>
            <span>{ count }</span>
            <button onClick={ () => onPlusItemCount(id) }>
               <img src={ plusSvg } alt=""/>
            </button>
         </div>

         <span className={ s.price }>{ price } ₴</span>

         <button
            className={ s.removeBtn }
            onClick={ () => onRemoveItem(id) }
         >
            {
               removingState.some(itemId => itemId === id)
                  ? <Loader
                     className={ s.loader }
                     type="Oval"
                     width={30}
                     height={30}
                     color="#929292"
                  />
                  : <img src={ removeSvg } alt=""/>
            }
         </button>
      </div>
   )
}

export default CartItem