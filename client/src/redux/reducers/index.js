import { combineReducers } from 'redux'

import products from './products'
import cart from './cart'
import filters from './filters'
import auth from './auth'
import app from './app'
import alert from './alert'

const rootReducer = combineReducers({
   products,
   cart,
   filters,
   auth,
   app,
   alert
})

export default rootReducer