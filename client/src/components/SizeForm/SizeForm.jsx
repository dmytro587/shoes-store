import { useState } from 'react'
import cn from 'classnames'

import * as s from './SizeForm.module.sass'

const sizes = [36, 37, 38, 39, 40, 41, 42, 43]

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
            onChange={ onSelectAllSizes }
         >
            <input
               name="allSizes"
               type="checkbox"
               checked={ isAllSizesChecked }
            />
            Все размеры
         </label>
      </form>
   )
}

export default SizeForm