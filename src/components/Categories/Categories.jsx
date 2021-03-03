import { useState } from 'react'
import cn from 'classnames'

import * as s from './Categories.module.sass'

const Categories = ({ items, isLoading, onSelectCategory }) => {
   const [activeCategory, setActiveCategory] = useState(0)

   const onCategoryClickHandler = (index, type) => {
      setActiveCategory(index)
      onSelectCategory(type)
   }

   return (
      <div>
         {
            items.map((obj, index) => (
               <button
                  key={ obj.type }
                  className={ cn(s.item, { [s.active]: index === activeCategory }) }
                  onClick={ () => onCategoryClickHandler(index, obj.type) }
                  disabled={ isLoading }
               >
                  { obj.name }
               </button>
            ))
         }
      </div>
   )
}

export default Categories