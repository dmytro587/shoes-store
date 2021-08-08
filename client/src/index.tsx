import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import { history, noScrollbarListener } from '@utils'
import store from '@redux/store'

import { ErrorBoundary } from './hoc'
import App from './App'

import './sass/index.sass'

noScrollbarListener()

ReactDOM.render(
   <React.StrictMode>
      <Router history={ history }>
         <Provider store={ store }>
            <ErrorBoundary fullPage>
               <App />
            </ErrorBoundary>
         </Provider>
      </Router>
   </React.StrictMode>,
   document.getElementById('root')
)

