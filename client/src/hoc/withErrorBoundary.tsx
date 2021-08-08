import React from 'react'
import ErrorBoundary from './ErrorBoundary'

export default function withErrorBoundary<BaseProps extends {}>(Component: React.ComponentType<BaseProps>) {
   const ExtendedComponent: React.FC<BaseProps> = (props) => (
      <ErrorBoundary>
         <Component { ...props } />
      </ErrorBoundary>
   )

   return ExtendedComponent
}

