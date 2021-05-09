import { useDispatch } from 'react-redux'

import { setSortByPrice, setSortBySize } from '../../redux/actions/filters'
import { PriceForm, SizeForm } from './components'

import * as s from './Sidebar.module.sass'

const Sidebar = () => {
   const dispatch = useDispatch()

   const onSelectRangePrice = sortByPriceObj => {
      const { order, from, to } = sortByPriceObj
      dispatch(setSortByPrice(order, from, to))
   }

   const onSelectSize = sizeRange => {
      dispatch(setSortBySize(sizeRange))
   }

   return (
      <div className={ s.aside }>
         <h4 className={ s.sectionTitle }>Фильтры</h4>

         <div className={ s.filter }>
            <h5 className={ s.filterTitle }>Цена</h5>
            <PriceForm onSelectRangePrice={ onSelectRangePrice } />
         </div>

         <div className={ s.filter }>
            <h5 className={ s.filterTitle }>Размер</h5>
            <SizeForm onSelectSize={ onSelectSize } />
         </div>
      </div>
   )
}

export default Sidebar