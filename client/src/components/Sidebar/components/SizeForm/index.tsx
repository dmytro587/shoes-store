import React, { useState } from 'react'
import cn from 'classnames'

import { dataForRender } from '../../../../config'
import s from './SizeForm.module.sass'



interface Props {
   onSelectSize(selectedSizes: number[]): void
}

const { AVAILABLE_SIZES } = dataForRender

const SizeForm: React.FC<Props> = ({ onSelectSize }) => {
   const [activeSizesIdx, setActiveSizesIdx] = useState<number[]>([])
   const [isAllSizesSelected, setIsAllSizesSelected] = useState(true)

   const confirmSelectingHandler = () => {
      if (activeSizesIdx.length > 0) {
         setIsAllSizesSelected(false)
         onSelectSize(
            AVAILABLE_SIZES.filter((_, i) => activeSizesIdx.includes(i))
         )
      }
   }

   const selectSizeHandler = (index: number) => {
      if (activeSizesIdx.includes(index)) {
         setActiveSizesIdx(activeSizesIdx.filter(i => i !== index))
      } else {
         setActiveSizesIdx([...activeSizesIdx, index])
      }

      setIsAllSizesSelected(false)
   }

   const selectAllSizesHandler = () => {
      if (!isAllSizesSelected) {
         onSelectSize([])
         // onSelectSize(null)
         setActiveSizesIdx([])
      }
      setIsAllSizesSelected(!isAllSizesSelected)
   }

   const sizesList = AVAILABLE_SIZES.map((size, index) => (
      <label
         key={ size }
         className={ cn(s.size, {
            [s.active]: activeSizesIdx.includes(index)
         }) }
         onChange={ () => selectSizeHandler(index) }
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
            onClick={ confirmSelectingHandler }
            disabled={ activeSizesIdx.length === 0 }
         >
            Подтвердить
         </button>

         <label
            className={ s.allSizes }
         >
            <input
               name="allSizes"
               type="checkbox"
               onChange={ selectAllSizesHandler }
               checked={ isAllSizesSelected }
            />
            Все размеры
         </label>
      </form>
   )
}

export default SizeForm