import * as s from './CartItemLoader.module.sass'

const CartItemLoader = () => (
   <div className={ s.wrapper }>

      <div className={ s.infoBlock }>
         <div className={ s.img }>
            <div className={ s.shimmer } />
         </div>

         <div className={ s.info }>
            <div className={ s.name }>
               <div className={ s.shimmer } />
            </div>
            <div className={ s.variant }>
               <div className={ s.shimmer } />
            </div>
         </div>
      </div>

      <div className={ s.counter }>
         <div className={ s.counterButton }>
            <div className={ s.shimmer } />
         </div>
         <span className={ s.count }>
            <div className={ s.shimmer } />
         </span>
         <div className={ s.counterButton }>
            <div className={ s.shimmer } />
         </div>
      </div>

      <span className={ s.price }>
         <div className={ s.shimmer } />
      </span>

      <div className={ s.removeBtn }>
         <div className={ s.shimmer } />
      </div>
   </div>
)

export default CartItemLoader