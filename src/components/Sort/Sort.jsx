import { useState, useEffect, useRef } from 'react'
import cn from 'classnames'

import * as s from './Sort.module.sass'
import arrowSvg from './../../assets/images/popup-arrow.svg'

const Sort = ({ items, onSortClick }) => {
   const [isActive, setIsActive] = useState(false)
   const [activeItem, setActiveItem] = useState(0)
   const popupRef = useRef(null)

   const onItemClick = index => {
      setActiveItem(index)
      onSortClick(items[activeItem])
   }

   const onOutsideClick = () => {
      if (isActive) {
         setIsActive(false)
      }
   }

   useEffect(() => {
      document.addEventListener('click', onOutsideClick)

      return () => document.removeEventListener('click', onOutsideClick)
      // eslint-disable-next-line
   }, [isActive])

   const onSelectSort = () => {
      setIsActive(!isActive)
   }

   const sortItems = items.map((obj, index) => (
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
               { sortItems }
            </ul>
         ) }
      </div>
   )
}

export default Sort