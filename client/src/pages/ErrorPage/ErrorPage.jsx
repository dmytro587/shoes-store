import cn from 'classnames'

import * as s from './ErrorPage.module.sass'

const ErrorPage = ({ message, status }) => {
   return (
      <div className={ cn('wrapper', s.wrapper) }>
         <h1>Ошибка { status }</h1>
         <p>{ message }</p>
      </div>
   )
}

export default ErrorPage