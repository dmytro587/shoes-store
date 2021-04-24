import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

import { initializeApp } from './redux/actions/app'
import { getIsInitialized } from './redux/selectors/app'
import { getIsAuthed } from './redux/selectors/auth'

import { withAppErrorHandling } from './hoc'
import { Header } from './components'
import { Home, Cart, Auth, ResetPassword, NewPassword } from './pages'
import Loader from 'react-loader-spinner'


const App = () => {
   const dispatch = useDispatch()
   const isInitialized = useSelector(getIsInitialized)
   const isAuthed = useSelector(getIsAuthed)

   useEffect(() => {
      dispatch(initializeApp())
      // eslint-disable-next-line
   }, [])

   if (!isInitialized) {
      return (
         <div className="loader-wrapper">
            <Loader
               type="Rings"
               color="#000"
               height={ 100 }
               width={ 100 }
            />
         </div>
      )
   }

   let routes = (
      <Switch>
         <Route path="/home" component={ Home }/>
         <Route path="/auth" component={ Auth }/>
         <Route path="/reset-password" component={ ResetPassword } />
         <Route path="/new-password/:token" component={ NewPassword } />
         <Redirect to="/home" />
      </Switch>
   )

   if (isAuthed) {
      routes = (
         <Switch>
            <Route path="/home" component={ Home }/>
            <Route exact path="/cart" component={ Cart }/>
            <Route path="/auth" component={ Auth }/>
            <Redirect to="/home" />
         </Switch>
      )
   }

   return (
      <div className="wrapper">
         <Header/>
         { routes }
      </div>
   )
}

export default withAppErrorHandling(App)

