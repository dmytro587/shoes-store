import { Route } from 'react-router-dom'

import { Header } from './components'
import { Home, Cart } from './pages'

const App = () => {
   return (
      <div className="wrapper">
         <Header/>

         <Route exact path="/" component={ Home }/>
         <Route exact path="/cart" component={ Cart }/>
      </div>
   )
}

export default App

// TODO: HEADER -> Убрать копейки в цене.