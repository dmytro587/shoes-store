import { useDispatch } from 'react-redux'

import { setSortBy, setSortBySizes } from '../../redux/actions/filters'
import { PriceForm, SizeForm } from '../index'

import * as s from './Sidebar.module.sass'

const Sidebar = () => {
   const dispatch = useDispatch()

   const onSelectRangePrice = (type, range) => {
      dispatch(setSortBy(type, null, range))
   }

   const onSelectSize = sizeRange => {
      dispatch(setSortBySizes(sizeRange))
   }

   return (
      <div className={ s.aside }>
         <h4 className={ s.sectionTitle }>Фильтры</h4>

         <div className={ s.filter }>
            <h5 className={ s.filterTitle }>Цена</h5>
            <PriceForm
               onSelectRangePrice={ onSelectRangePrice }
            />
         </div>

         <div className={ s.filter }>
            <h5 className={ s.filterTitle }>Размер</h5>
            <SizeForm
               onSelectSize={ onSelectSize }
            />
         </div>
      </div>
   )
}

export default Sidebar