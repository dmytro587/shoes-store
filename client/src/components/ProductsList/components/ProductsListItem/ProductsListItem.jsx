import { Link, useLocation } from 'react-router-dom'

import * as s from './ProductsListItem.module.sass'

const noop = () => {}

const ProductsListItem = ({ id, name, imgUrl, onRemoveClick = noop, onEditClick = noop }) => {
   const { pathname } = useLocation()

   const removeHandler = () => {
      if (window.confirm('Вы действительно хотите удалить этот товар?')) {
         onRemoveClick(id)
      }
   }

   const editHandler = () => onEditClick(id)

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

export default ProductsListItem