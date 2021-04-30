import { useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import * as s from './Categories.module.sass'

const Categories = ({ items, isLoaded, onSelectCategory }) => {
   const [activeCategory, setActiveCategory] = useState(0)

   const onCategoryClickHandler = (index, type) => {
      setActiveCategory(index)
      onSelectCategory(type)
   }

   return (
      <div>
         {
            items.map((obj, index) => (
               <Link
                  key={ obj.type }
                  to={`/home?category=${obj.type}`}
                  className={ cn(s.item, { [s.active]: index === activeCategory }) }
                  onClick={ () => onCategoryClickHandler(index, obj.type) }
                  disabled={ isLoaded }
               >
                  { obj.name }
               </Link>
            ))
         }
      </div>
   )
}

export default Categories