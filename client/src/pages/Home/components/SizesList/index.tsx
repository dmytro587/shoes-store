import React from 'react'
import s from './SizesList.module.sass'

interface Props {
   sizes: number[]
}

const SizesList: React.FC<Props> = ({ sizes }) => {
   const restSizes = (sizes.length - 1) !== 0
      ? `и ещё ${sizes.length}`
      : ''

   return (
      <span className={s.sizeItem}>
         { sizes[0] } { restSizes }
      </span>
   )
}

export default SizesList