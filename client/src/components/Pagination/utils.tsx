import React from "react"

const getRange = (from: number, to: number) => {
   const res = []

   for (let i = from; i <= to; i++) {
      res.push(i)
   }

   return res
}

export const getPagination = (totalCount: number, currentPage: number) => {
   const startPages = []
   const endPages = []

   if (totalCount >= 10) {
      startPages.push(...getRange(1, 3))
      endPages.push(...getRange(totalCount, totalCount - 3))
   }

   const pageNeighbours = 1
   const startPage = 1
   const endPage = totalCount
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
      endPage > startPage ? endPage : null
   ]

   return pagination
}