import cn from 'classnames'
import * as s from './Button.module.sass'

const Button = ({
    children,
    fill,
    outline,
    quantity,
    onClick,
    black,
    small,
    className,
   ...rest
}) => (
   <button
      className={
         cn(s.button, className, {
            [s.outline]: !!outline,
            [s.fill]: !!fill,
            [s.black]: !!black,
            [s.small]: !!small
         })
      }
      onClick={ onClick }
      { ...rest }
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