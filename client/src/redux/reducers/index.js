import { combineReducers } from 'redux'

import products from './products'
import cart from './cart'
import filters from './filters'
import auth from './auth'
import app from './app'

const rootReducer = combineReducers({
   products,
   cart,
   filters,
   auth,
   app
})

export default rootReducer