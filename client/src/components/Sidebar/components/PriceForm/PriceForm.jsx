import { useState } from 'react'

import { numRegexp } from '../../../../utils'
import { priceFilter } from '../../../../config'

import * as s from './PriceForm.module.sass'


const PriceForm = ({ onSelectRangePrice }) => {
   const [firstValue, setFirstValue] = useState('')
   const [secondValue, setSecondValue] = useState('')
   const [selectedOption, setSelectedOption] = useState('option4')

   const onFirstValueChange = e => {
      setFirstValue(numRegexp(e.target.value) || 0)
   }

   const onSecondValueChange = e => {
      setSecondValue(numRegexp(e.target.value) || 0)
   }

   const onSelectPrice = (e, range) => {
      const from = range[0]
      const to = range[1]
      const sortObj = {
         order: null,
         from: from !== 'all' ? from : 0,
         to: to !== 'all' ? to : 0
      }

      setSelectedOption(e.target.value)
      onSelectRangePrice(sortObj)
   }

   const onCustomSelectPrice = () => {
      setSelectedOption(null)
      onSelectRangePrice({
         from: firstValue || 0,
         to: secondValue || 0
      })
   }

   const checkboxes = priceFilter.map(item => (
      <label key={ item.id }>
         <input
            name={ item.name }
            type="radio"
            value={ item.value }
            checked={ item.value === selectedOption }
            onChange={ e => onSelectPrice(e, item.range) }
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
               onChange={ onFirstValueChange }
            />
            <input
               type="text"
               name="secondValue"
               placeholder="До"
               value={ secondValue }
               onChange={ onSecondValueChange }
            />

            <button
               type="button"
               className={ s.button }
               onClick={ onCustomSelectPrice }
               disabled={ !firstValue && !secondValue}
            >
               Применить
            </button>
         </div>
      </form>
   )
}

export default PriceForm
