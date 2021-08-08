import React from 'react'
import { Link, useLocation } from 'react-router-dom'

import s from './ProductsListItem.module.sass'

const noop = () => {}

interface Props {
   id: string
   name: string
   imgUrl: string
   onRemove: (id: string) => void
   onEdit: (id: string) => void
}

const ProductItem: React.FC<Props> = ({
   id,
   name,
   imgUrl,
   onRemove = noop,
   onEdit = noop
}) => {
   const { pathname } = useLocation()

   const removeHandler = () => {
      if (window.confirm('Вы действительно хотите удалить этот товар?')) {
         onRemove(id)
      }
   }

   const editHandler = () => onEdit(id)

   return (
      <div className={ s.item }>
         <div className={ s.left }>
            <div className={ s.img }>
               <img src={ imgUrl } alt=""/>
            </div>

            <p
               className={ s.name }
               onClick={ editHandler }
            >
               { name }
            </p>
         </div>

         <div className={ s.actions }>
            <button onClick={ editHandler }>
               <Link to={ `${ pathname }/edit/${ id }` }>
                  Редактировать
               </Link>
            </button>

            <button
               className={ s.remove }
               onClick={ removeHandler }
            >
               Удалить
            </button>
         </div>
      </div>
   )
}

export default ProductItem