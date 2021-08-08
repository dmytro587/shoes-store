import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { CategoryFilter } from '@types'
import { mainRoutes } from '@navigation/constants'

import s from './Categories.module.sass'


interface Item {
   name: string
   type: string
}

interface Props {
   items: Item[]
   isLoading: boolean
   onSelectCategory: (type: CategoryFilter) => any
}

const { HOME } = mainRoutes

const Categories: React.FC<Props> = ({ items, isLoading, onSelectCategory }) => {
   const [activeCategory, setActiveCategory] = useState(0)

   const onCategoryClickHandler = (index: number, type: string) => {
      const categoryType = (type === 'all' ? null : type) as CategoryFilter

      setActiveCategory(index)
      onSelectCategory(categoryType)
   }

   return (
      <div>
         {
            items.map((item, index) => (
               <button
                  disabled={ isLoading }
                  key={ item.type }
                  className={ cn(s.item, { [s.active]: index === activeCategory }) }
                  onClick={ () => onCategoryClickHandler(index, item.type) }
               >
                  <Link to={ `${ HOME }?category=${ item.type }` }>
                     { item.name }
                  </Link>
               </button>
            ))
         }
      </div>
   )
}

export default Categories