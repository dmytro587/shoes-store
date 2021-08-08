import React from 'react'
import cn from 'classnames'

import s from './ErrorPage.module.sass'

interface Props {
   error: string
   status?: number
}

const ErrorPage: React.FC<Props> = ({ error, status }) => {
   return (
      <div className={ cn('wrapper', s.wrapper) }>
         <h1>Ошибка { status }</h1>
         <p>{ error }</p>
      </div>
   )
}

export default ErrorPage