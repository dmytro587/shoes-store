import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from './hooks'

import { initializeApp, selectIsInitialized } from '@redux/slices/app'

import { withAppErrorHandling } from '@hoc'
import { FullscreenLoader, Header } from './components'
import { MainRouters } from './navigation'

const App: React.FC = () => {
   const dispatch = useAppDispatch()
   const isInitialized = useAppSelector(selectIsInitialized)

   useEffect(() => {
      dispatch(initializeApp())
      // eslint-disable-next-line
   }, [])

   if (!isInitialized) {
      return <FullscreenLoader />
   }

   return (
      <div className="wrapper">
         <Header/>
         <MainRouters/>
      </div>
   )
}

export default withAppErrorHandling(App)

