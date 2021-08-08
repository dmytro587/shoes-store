import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { useAppSelector } from '../hooks'
import { selectIsAuthed } from '@redux/slices/auth'


interface Props extends RouteProps{
   component: typeof React.Component | React.FC<any>
}

const PrivateRouter: React.FC<Props> = ({ component: Component, ...rest }) => {
   const isAuthed = useAppSelector(selectIsAuthed)

   return (
      <Route
         { ...rest }
         render={
            props => !isAuthed
               ? <Redirect to='/auth/login'/>
               : <Component { ...props } />
         }
      />
   )
}

export default PrivateRouter