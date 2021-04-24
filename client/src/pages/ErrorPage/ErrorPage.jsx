import cn from 'classnames'

import * as s from './ErrorPage.module.sass'

const ErrorPage = ({ error, status }) => {
   return (
      <div className={ cn('wrapper', s.wrapper) }>
         <h1>Ошибка { status }</h1>
         <p>{ error }</p>
      </div>
   )
}

export default ErrorPage