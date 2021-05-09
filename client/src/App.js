import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeApp } from './redux/actions/app'
import { getIsInitialized } from './redux/selectors/app'

import { withAppErrorHandling } from './hoc'
import { FullscreenLoader, Header } from './components'
import { MainRouterConfig } from './navigation'

const App = () => {
   const dispatch = useDispatch()
   const isInitialized = useSelector(getIsInitialized)

   useEffect(() => {
      dispatch(initializeApp())
      // eslint-disable-next-line
   }, [])

   if (!isInitialized) {
      return <FullscreenLoader/>
   }

   return (
      <div className="wrapper">
         <Header/>

         <MainRouterConfig/>
      </div>
   )
}

export default withAppErrorHandling(App)

