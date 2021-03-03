import { Loader, SizesList } from '../index'

import minusSvg from './../../assets/images/minus.svg'
import plusSvg from './../../assets/images/plus.svg'
import removeSvg from './../../assets/images/remove.svg'

import * as s from './CartItem.module.sass'

const CartItem = ({
   id,
   name,
   imgUrl,
   sizes,
   selectedSize,
   price,
   count,
   removingState,
   onRemoveItem,
   onPlusItem,
   onMinusItem,
   onSelectSize
}) => {

   return (
      <div className={ s.wrapper }>

         <div className={ s.infoBlock }>
            <div className={ s.imgWrapper }>
               <img src={ imgUrl } alt=""/>
            </div>

            <div className={ s.info }>
               <h4>{ name }</h4>
               <form>
                  <SizesList
                     sizes={ sizes }
                     selectDefault={ selectedSize }
                     onSelectSize={ size => onSelectSize(id, size) }
                  />
               </form>
            </div>
         </div>

         <div className={ s.counter }>
            <button onClick={ () => onMinusItem(id) }>
               <img src={ minusSvg } alt=""/>
            </button>
            <span>{ count }</span>
            <button onClick={ () => onPlusItem(id) }>
               <img src={ plusSvg } alt=""/>
            </button>
         </div>

         <span className={ s.price }>{ price } ₴</span>

         <button
            className={ s.removeBtn }
            onClick={ () => onRemoveItem(id) }
         >
            {
               removingState.some(el => el.itemId === id)
                  ? <Loader />
                  : <img src={ removeSvg } alt=""/>
            }
         </button>
      </div>
   )
}

export default CartItem