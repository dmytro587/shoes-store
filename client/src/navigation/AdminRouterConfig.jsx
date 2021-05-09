import { Route, Switch } from 'react-router-dom'

import { AddProduct, ProductEdit, ProductsList } from '../components'
import { admin } from './constants'

const AdminRouterConfig = () => {
   const {
      ROOT,
      ADD_PRODUCT,
      PRODUCTS_LIST,
      EDIT_PRODUCT
   } = admin

   return (
      <Switch>
         <Route exact path={ ROOT } component={ AddProduct }/>
         <Route path={ ADD_PRODUCT } component={ AddProduct }/>
         <Route path={ PRODUCTS_LIST } component={ ProductsList }/>
         <Route path={ EDIT_PRODUCT } component={ ProductEdit }/>
      </Switch>
   )
}

export default AdminRouterConfig