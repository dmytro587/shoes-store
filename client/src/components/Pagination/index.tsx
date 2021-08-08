import React from 'react'
import cn from 'classnames'

import { getPagination } from './utils'
import s from './Pagination.module.sass'


interface Props {
   totalPagesCount: number
   currentPage: number
   onPageClick: (pageNumber: number) => void
   className?: string
}

const Pagination: React.FC<Props> = ({
   totalPagesCount,
   currentPage,
   onPageClick,
   className
}) => {
   const pagination = getPagination(totalPagesCount, currentPage)

   const changePageHandler = (num: number) => {
      onPageClick(num)
   }

   const onStartClick = () => {
      onPageClick(1)
   }

   const onEndClick = () => {
      onPageClick(totalPagesCount)
   }

   const pages = pagination.map(i => {
      if (typeof i !== 'number') return i

      return (
         <button
            key={ Math.random() }
            className={ cn(s.button, { [s.active]: currentPage === i }) }
            onClick={ () => changePageHandler(i) }
         >
            { i }
         </button>
      )
   })

   return (
      <nav className={ cn(s.wrapper, className) }>
         <button
            className={ s.arrowBtn }
            onClick={ onStartClick }
            disabled={ currentPage === 1 }
         >
            <svg focusable="false" viewBox="0 0 24 24">
               <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            </svg>
         </button>

         { pages }

         <button
            className={ s.arrowBtn }
            onClick={ onEndClick }
            disabled={ currentPage === totalPagesCount }
         >
            <svg focusable="false" viewBox="0 0 24 24">
               <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
         </button>
      </nav>
   )
}

export default Pagination