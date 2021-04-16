import cn from 'classnames'

import * as s from './Pagination.module.sass'

const noop = () => {}

const range = (from, to) => {
   const res = []

   for (let i = from; i <= to; i++) {
      res.push(i)
   }

   return res
}

const getPagination = (count, currentPage) => {
   const startPages = []
   const endPages = []

   if (count >= 10) {
      startPages.push(...range(1, 3))
      endPages.push(...range(count, count - 3))
   }

   const pageNeighbours = 1
   const startPage = 1
   const endPage = count
   const hasLeftSpill = currentPage > 3
   const hasRightSpill = endPage - currentPage > 3
   const hasSpillOffset = hasLeftSpill && hasRightSpill

   let pagination = []
   const points = <span>&nbsp; ... &nbsp;</span>

   const nextPage = currentPage + pageNeighbours
   const prevPage = currentPage - pageNeighbours

   switch (true) {
      case hasLeftSpill && !hasRightSpill:
         pagination = [
            startPages.includes(currentPage) ? 2 : points,
            prevPage,
            currentPage !== endPage ? currentPage : null,
            nextPage >= endPage ? null : nextPage
         ]
         break
      case hasRightSpill && !hasLeftSpill:
         pagination = [
            currentPage !== startPage ? currentPage : null,
            nextPage,
            points,
         ]
         break
      case hasSpillOffset:
         pagination = [
            startPages.includes(currentPage) ? null : points,
            prevPage,
            currentPage,
            nextPage,
            endPages.includes(currentPage) ? null : points
         ]
         break
      default:
         pagination = [
            prevPage > startPage ? prevPage : null,
            (currentPage > startPage) && (currentPage < endPage) ? currentPage : null,
            nextPage < endPage ? nextPage : null
         ]
   }

   pagination = [
      startPage,
      ...pagination,
      endPage
   ]

   return pagination
}

const Pagination = ({ count, currentPage, onPageClick }) => {
   const pagination = getPagination(count, currentPage)

   const changePageHandler = num => {
      onPageClick(num)
   }

   const onStartClick = () => {
      onPageClick(1)
   }

   const onEndClick = () => {
      onPageClick(count)
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
      <nav className={ s.wrapper }>
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
            disabled={ currentPage === count }
         >
            <svg focusable="false" viewBox="0 0 24 24">
               <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
         </button>
      </nav>
   )
}

export default Pagination