import React, { useState, useEffect, useRef } from 'react'
import cn from 'classnames'

import { OrderFilter } from '@types'

import arrowSvg from '@assets/images/popup-arrow.svg'
import s from './Sort.module.sass'


interface Item {
   name: string
   order: OrderFilter
}

interface Props {
   items: Item[]
   onSortClick: (order: OrderFilter) => void
}

const SortPanel: React.FC<Props> = ({ items, onSortClick }) => {
   const [isActive, setIsActive] = useState(false)
   const [activeItem, setActiveItem] = useState(0)
   const popupRef = useRef(null)

   const onItemClick = (index: number) => {
      setActiveItem(index)
      onSortClick(items[activeItem].order)
   }

   const onOutsideClick = () => {
      isActive && setIsActive(false)
   }

   useEffect(() => {
      document.addEventListener('click', onOutsideClick)

      return () => document.removeEventListener('click', onOutsideClick)
      // eslint-disable-next-line
   }, [isActive])

   const onSelectSort = () => {
      setIsActive(!isActive)
   }

   const renderItems = () => items.map((obj, index) => (
      <li
         key={ obj.name }
         className={ cn({ [s.active]: activeItem === index }) }
         onClick={ () => onItemClick(index) }
      >
         { obj.name }
      </li>
   ))

   return (
      <div className={ s.wrapper }>
         <img className={ cn(s.icon, { [s.active]: isActive }) } src={ arrowSvg } alt=""/>

         Сортировка по:
         <span onClick={ onSelectSort }>
            { items[activeItem].name }
         </span>

         { isActive && (
            <ul className={ s.popup } ref={ popupRef }>
               { renderItems() }
            </ul>
         ) }
      </div>
   )
}

export default SortPanel