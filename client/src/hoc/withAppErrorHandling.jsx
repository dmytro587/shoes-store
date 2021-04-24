import { Component } from 'react'
import { useSelector } from 'react-redux'

import { getError } from '../redux/selectors/app'
import { useNetworkDetector } from '../hooks'

import { ErrorPage } from '../pages'

const withAppErrorHandling = Component => props => {
   const initError = useSelector(getError)
   const networkError = useNetworkDetector()

   let error = {}

   switch (true) {
      case !!networkError:
         error.message = networkError
         break
      case !!initError:
         error.message = initError.message
         error.status = initError.status
         break
      default:
         error = null
   }

   if (error) {
      return (
         <ErrorPage
            error={ error.message }
            status={ error.status }
         />
      )
   }

   return <Component {...props } />
}

export default withAppErrorHandling