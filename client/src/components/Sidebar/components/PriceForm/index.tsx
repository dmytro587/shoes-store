import React, { ChangeEvent, useState } from 'react'

import { numRegexp } from '@utils'
import { dataForRender } from '@config'

import { SelectedPriceParams } from '../../index'
import s from './PriceForm.module.sass'


type InputEvent = ChangeEvent<HTMLInputElement>

interface Props {
   onSelectPriceRange: (selectedPriceParams: Partial<SelectedPriceParams>) => void
}

const PriceForm: React.FC<Props> = ({ onSelectPriceRange }) => {
   const [firstValue, setFirstValue] = useState('')
   const [secondValue, setSecondValue] = useState('')
   const [selectedOption, setSelectedOption] = useState<string | null>('option4')

   const firstValueChangeHandler = (event: InputEvent) => {
      setFirstValue(numRegexp(event.target.value) || '0')
   }

   const secondValueChangeHandler = (event: InputEvent) => {
      setSecondValue(numRegexp(event.target.value) || '0')
   }

   const selectPriceRangeHandler = (event: InputEvent, range: number[]) => {
      const from = range[0]
      const to = range[1]
      const priceFilterParams = { from, to }

      setSelectedOption(event.target.value)
      onSelectPriceRange(priceFilterParams)
   }

   const customSelectPriceHandler = () => {
      setSelectedOption(null)
      onSelectPriceRange({
         from: Number(firstValue) || 0,
         to: Number(secondValue) || 0
      })
   }

   const checkboxes = dataForRender.PRICE_FILTERS.map(item => (
      <label key={ item.id }>
         <input
            name={ item.name }
            type="radio"
            value={ item.value }
            checked={ item.value === selectedOption }
            onChange={ e => selectPriceRangeHandler(e, item.range) }
         />
         { item.text }
      </label>
   ))

   return (
      <form>
         <div className={ s.checkboxes }>
            { checkboxes }
         </div>

         <div className={ s.priceRange }>
            <input
               type="text"
               name="firstValue"
               placeholder="От"
               value={ firstValue }
               onChange={ firstValueChangeHandler }
            />
            <input
               type="text"
               name="secondValue"
               placeholder="До"
               value={ secondValue }
               onChange={ secondValueChangeHandler }
            />

            <button
               type="button"
               className={ s.button }
               onClick={ customSelectPriceHandler }
               disabled={ !firstValue && !secondValue}
            >
               Применить
            </button>
         </div>
      </form>
   )
}

// const sortObj = {
//    order: null,
//    from: from !== 'all' ? from : 0,
//    to: to !== 'all' ? to : 0
// }

export default PriceForm
