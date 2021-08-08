import React from 'react'

import { setPrice, setSizes } from '@redux/slices/filters'
import { PriceForm, SizeForm } from './components'

import { useAppDispatch } from '@hooks'

import { OrderFilter } from '@types'

import s from './Sidebar.module.sass'



export interface SelectedPriceParams {
   order: OrderFilter
   from: number
   to: number
}

const Sidebar: React.FC = () => {
   const dispatch = useAppDispatch()

   const onSelectRangePrice = (selectedPriceParams: Partial<SelectedPriceParams>) => {
      const { order = 'asc', from = 0, to = 0 } = selectedPriceParams
      dispatch(setPrice({ order, from, to }))
   }

   const onSelectSize = (selectedSizes: number[]) => {
      dispatch(setSizes(selectedSizes))
   }

   return (
      <div className={ s.aside }>
         <h4 className={ s.sectionTitle }>Фильтры</h4>

         <div className={ s.filter }>
            <h5 className={ s.filterTitle }>Цена</h5>
            <PriceForm onSelectPriceRange={ onSelectRangePrice } />
         </div>

         <div className={ s.filter }>
            <h5 className={ s.filterTitle }>Размер</h5>
            <SizeForm onSelectSize={ onSelectSize } />
         </div>
      </div>
   )
}

export default Sidebar