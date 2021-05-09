import { useState } from 'react'
import cn from 'classnames'

import { availableSizes as sizes } from '../../../../config'

import * as s from './SizeForm.module.sass'

const SizeForm = ({ onSelectSize }) => {
   const [activeSizes, setActiveSizes] = useState([])
   const [isAllSizesChecked, setIsAllSizesChecked] = useState(true)

   const onConfirmSize = () => {
      if (activeSizes.length > 0) {
         setIsAllSizesChecked(false)
         onSelectSize(
            sizes.filter((_, i) => activeSizes.includes(i))
         )
      }
   }

   const onSelectSizeHandler = index => {
      if (activeSizes.includes(index)) {
         setActiveSizes(activeSizes.filter(i => i !== index))
      } else {
         setActiveSizes([...activeSizes, index])
      }
      setIsAllSizesChecked(false)
   }

   const onSelectAllSizes = () => {
      if (!isAllSizesChecked) {
         onSelectSize(null)
         setActiveSizes([])
      }
      setIsAllSizesChecked(!isAllSizesChecked)
   }

   const sizesList = sizes.map((size, index) => (
      <label
         key={ size }
         className={ cn(s.size, {
            [s.active]: activeSizes.includes(index)
         }) }
         onChange={ () => onSelectSizeHandler(index) }
      >
         <input
            name="size"
            type="checkbox"
         />
         <span>{ size }</span>
      </label>
   ))

   return (
      <form>
         <div className={ s.sizes }>{ sizesList }</div>
         <button
            type="button"
            className={ s.button }
            onClick={ onConfirmSize }
            disabled={ activeSizes.length === 0 }
         >
            Подтвердить
         </button>

         <label
            className={ s.allSizes }
         >
            <input
               name="allSizes"
               type="checkbox"
               onChange={ onSelectAllSizes }
               checked={ isAllSizesChecked }
            />
            Все размеры
         </label>
      </form>
   )
}

export default SizeForm