import { combineReducers } from 'redux'

import products from './products'
import cart from './cart'
import filters from './filters'

const rootReducer = combineReducers({
   products,
   cart,
   filters
})

export default rootReducer