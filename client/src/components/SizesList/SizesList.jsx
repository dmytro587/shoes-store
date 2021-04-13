import * as s from './SizesList.module.sass'

const SizesList = ({ sizes }) => {
   const more = (sizes.length - 1) !== 0
      ? `и ещё ${sizes.length}`
      : ''

   return (
      <span className={s.sizeItem}>
         { sizes[0] } { more }
      </span>
   )
}

export default SizesList