import { Suspense } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import { FullscreenLoader } from '../components'
import {
   AdminPanel,
   Auth,
   Cart,
   Home,
   NewPassword,
   ResetPassword
} from '../pages'
import { main } from './constants'
import { PrivateRouter } from './index'

const MainRouterConfig = () => {
   const {
      ADMIN_PANEL,
      AUTH_PAGE,
      CART,
      HOME,
      NEW_PASSWORD_PAGE,
      RESET_PASSWORD_PAGE
   } = main

   return (
      <Suspense fallback={ <FullscreenLoader/> }>
         <Switch>
            {/* public routes */}
            <Route path={ HOME } component={ Home }/>
            <Route path={ AUTH_PAGE } component={ Auth }/>
            <Route path={ ADMIN_PANEL } component={ AdminPanel }/>
            <Route path={ RESET_PASSWORD_PAGE } component={ ResetPassword }/>
            <Route path={ NEW_PASSWORD_PAGE } component={ NewPassword }/>

            {/* private routes */}
            <PrivateRouter exact path={ CART } component={ Cart }/>

            {/* if no page found */}
            <Redirect to="/home"/>
         </Switch>
      </Suspense>
   )
}

export default MainRouterConfig