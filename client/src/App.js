import { Route } from 'react-router-dom'

import { Header } from './components'
import { Home, Cart } from './pages'

const App = () => {

   return (
      <div className="wrapper">
         <Header/>

         <Route path="/home" component={ Home }/>
         <Route exact path="/cart" component={ Cart }/>
      </div>
   )
}

export default App

// TODO-TODAY: передалать структура на бэке, должно быть:
// { totalCount: Number, products: Array }

// TODO: HEADER -> Убрать копейки в цене.
// TODO: ProductCard -> убрать SizeList, вынести в отдельную страницу товара
// TODO: SizeForm, Home -> вынести данные в config
