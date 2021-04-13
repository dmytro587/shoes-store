import cn from 'classnames'
import * as s from './Button.module.sass'

const Button = ({
    children,
    fill,
    outline,
    quantity,
    onClick,
    black
}) => (
   <button
      className={ cn(s.button, {
         [s.outline]: !!outline,
         [s.fill]: !!fill,
         [s.black]: !!black
       }) }
      onClick={ onClick }
   >
      { children }
      {
         (quantity && quantity > 0)
            ? <span className={ s.quantity }>{ quantity }</span>
            : null
      }
   </button>
)

export default Button