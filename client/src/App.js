import { useEffect, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import { initializeApp } from './redux/actions/app'
import { getIsInitialized } from './redux/selectors/app'

import { PrivateRouter, withAppErrorHandling } from './hoc'
import { FullscreenLoader, Header } from './components'
import { Home, Cart, Auth, ResetPassword, NewPassword } from './pages'

const App = () => {
   const dispatch = useDispatch()
   const isInitialized = useSelector(getIsInitialized)

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

         <Suspense fallback={ <FullscreenLoader /> }>
            <Switch>
               <PrivateRouter exact path="/cart" component={ Cart }/>
               <Route path="/home" component={ Home }/>
               <Route path="/auth" component={ Auth }/>
               <Route path="/reset-password" component={ ResetPassword }/>
               <Route path="/new-password/:token" component={ NewPassword }/>
               <Redirect to="/home"/>
            </Switch>
         </Suspense>
      </div>
)
}

export default withAppErrorHandling(App)

