import React, { Component, ErrorInfo, PropsWithChildren } from 'react'

import s from './ErrorBoundary.module.sass'


type Props = PropsWithChildren<{
   errorMessage?: string,
   FallbackComponent?: React.ComponentType<{ errorMessage: string }>,
   empty?: boolean,
   fullPage?: boolean,
}>

class ErrorBoundary extends Component<Props> {
   state = {
      hasError: false as boolean,
      error: null as Error | null
   }

   static getDerivedStateFromError(error: Error) {
      return { hasError: true, error }
   }

   componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      console.log(error)
      console.log(errorInfo)
   }

   render() {
      const { children } = this.props
      const { hasError } = this.state

      if (hasError) handleError(this)

      return children
   }
}

const handleError = (ctx: ErrorBoundary) => {
   const { errorMessage, FallbackComponent, empty, fullPage } = ctx.props
   const { error } = ctx.state

   const errMessage = error?.message || errorMessage || 'Что-то пошло не так'
   ctx.setState({ error: { message: errMessage } })

   switch (true) {
      case empty:
         return null
      case Boolean(FallbackComponent):
         // @ts-ignore
         return <FallbackComponent errorMessage={ errMessage } />
      case fullPage:
         return (
            <div className={ s.wrapper }>
               <h1>Что-то пошло не так, попробуйте позже</h1>
               <p>Ошибка: { errMessage }</p>
            </div>
         )
      default:
         return <p>{ errMessage }</p>
   }
}

export default ErrorBoundary