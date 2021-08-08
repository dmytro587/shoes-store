import { combineReducers } from 'redux'

import appReducer from './app'
import alertReducer from './alert'
import filtersReducer from './filters'
import cartReducer from './cart'
import productsReducer from './products'
import authReducer from './auth'

const rootReducer = combineReducers({
   app: appReducer,
   alert: alertReducer,
   cart: cartReducer,
   filters: filtersReducer,
   products: productsReducer,
   auth: authReducer
})

export default rootReducer