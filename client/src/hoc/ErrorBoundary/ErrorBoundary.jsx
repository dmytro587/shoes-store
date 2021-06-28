import { Component } from 'react'

import * as s from './ErrorBoundary.module.sass'

class ErrorBoundary extends Component {
   constructor(props) {
      super(props)

      this.state = { hasError: false, error: null }
   }

   static getDerivedStateFromError(error) {
      return { hasError: true, error }
   }

   componentDidCatch(error, errorInfo) {
      console.log(error)
      console.log(errorInfo)
   }

   render() {
      const { errorMsg, FallbackComponent, empty, pageRender, children } = this.props
      const { hasError, error } = this.state

      if (hasError) {
         const err = error.message || errorMsg || 'Что-то пошло не так'

         switch (true) {
            case empty:
               return null
            case FallbackComponent:
               return <FallbackComponent error={ err } />
            case pageRender:
               return (
                  <div className={ s.wrapper }>
                     <h1>Что-то пошло не так, попробуйте позже</h1>
                     <p>Ошибка: { err }</p>
                  </div>
               )
            default:
               return <p>{ err }</p>
         }
      }

      return children
   }
}

export default ErrorBoundary