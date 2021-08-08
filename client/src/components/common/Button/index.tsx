import React, { MouseEvent } from 'react'
import cn from 'classnames'

import s from './Button.module.sass'

interface Props extends React.ComponentPropsWithoutRef<"button"> {
   children    : React.ReactChildren | React.ReactNode
   color       ?: 'black'
   outline     ?: boolean
   small       ?: boolean
   handleClick ?: Function
   className   ?: string
}

const Button: React.FC<Props> = ({
    children,
    outline,
    color= '',
    small,
    className,
    handleClick = () => {},
    ...rest
}) => {

   const onClick = (event: MouseEvent<HTMLButtonElement>) => handleClick()

   return (
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
}

export default Button