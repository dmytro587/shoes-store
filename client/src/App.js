import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { initializeApp } from './redux/actions/app'
import { getIsInitialized } from './redux/selectors/app'

import { withAppErrorHandling } from './hoc'
import { FullscreenLoader, Header } from './components'
import { MainRouters } from './navigation'

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

         <MainRouters/>
      </div>
   )
}

export default withAppErrorHandling(App)

