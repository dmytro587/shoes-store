import cn from 'classnames'
import * as s from './Button.module.sass'

const Button = ({
    children,
    outline,
    color,
    small,
    className,
    onClick,
    ...rest
}) => (
   <button
      className={
         cn(s.button, s.fill, className, {
            [s.outline]: !!outline,
            [s[color]]: !!color,
            [s.small]: !!small
         })
      }
      onClick={ onClick }
      { ...rest }
   >
      { children }
   </button>
)

export default Button