import { useState } from 'react'
import cn from 'classnames'

import * as s from './SizesList.module.sass'

const SizesList = ({ sizes, selectDefault = null, onSelectSize }) => {
   const selectDefaultIndex = selectDefault && sizes.findIndex(i => i === selectDefault)
   const [activeSize, setActiveSize] = useState(selectDefaultIndex)

   const onChangeSize = index => {
      setActiveSize(index)
      onSelectSize(sizes[index])
   }

   return sizes.map((size, index) => (
      <label
         key={ size }
         className={ cn(s.sizeItem, {
            [s.checked]: activeSize === index
         }) }
      >
         <input
            type="radio"
            name="size"
            onChange={ () => onChangeSize(index) }
            checked={ activeSize === index }
         />
         { size }
         { (index === sizes.length - 1) ? '' : '/' }
      </label>
   ))
}

export default SizesList