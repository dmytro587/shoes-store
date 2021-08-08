import React, { Component } from 'react'

import { selectGlobalError } from '@redux/slices/app'
import { useAppSelector, useNetworkDetector } from '@hooks'
import { ErrorPage } from '@pages'


export default function withAppErrorHandling(Component: React.ComponentType) {
   const WrappedComponent: React.FC = (props) => {
      const globalError = useAppSelector(selectGlobalError)
      const networkError = useNetworkDetector()

      const errorMessageToDisplay = networkError
         ? networkError : globalError
         ? globalError.message : null

      // errorStatus = globalError.status

      if (errorMessageToDisplay) {
         return (
            <ErrorPage
               error={ errorMessageToDisplay }
               // status={ error.status }
            />
         )
      }

      return <Component {...props } />
   }

   return WrappedComponent
}