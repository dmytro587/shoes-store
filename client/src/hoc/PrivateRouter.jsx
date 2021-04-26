import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getIsAuthed } from '../redux/selectors/auth'

const PrivateRouter = ({ component: Component, ...rest }) => {
   const isAuthed = useSelector(getIsAuthed)

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