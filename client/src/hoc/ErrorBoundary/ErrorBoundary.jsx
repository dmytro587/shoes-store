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
      const { errorMsg, FallbackComponent, isEmpty, pageRender } = this.props

      if (this.state.hasError) {
         const error = errorMsg || this.state.error.message

         if (isEmpty) return null

         if (FallbackComponent) {
            return <FallbackComponent error={ error } />
         }

         if (pageRender) {
            return (
               <div className={ s.wrapper }>
                  <h1>Что-то пошло не так, попробуйте позже</h1>
                  <p>Ошибка: { error }</p>
               </div>
            )
         }

         return <p>{ error }</p>
      }

      return this.props.children
   }
}

export default ErrorBoundary