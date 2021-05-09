import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import { checkAccess } from '../../redux/actions/auth'
import { getError, getIsChecked } from '../../redux/selectors/auth'

import { AdminRouterConfig } from '../../navigation'
import { FullscreenLoader } from '../../components'

import * as s from './AdminPanel.module.sass'

const AdminPanel = () => {
   const dispatch = useDispatch()
   const isChecked = useSelector(getIsChecked)
   const error = useSelector(getError)

   useEffect(() => {
      dispatch(checkAccess())
      // eslint-disable-next-line
   }, [])

   if (!isChecked) {
      return (
         <FullscreenLoader
            type="Oval"
            color="#000"
            height={ 60 }
            width={ 60 }
            className="fill-spinner"
         />
      )
   }

   if (error) {
      return (
         <div className={ s.error }>
            <h1>Ошибка <span>{ error.status }</span></h1>
            <p>{ error.message }</p>
         </div>
      )
   }

   return (
      <div className={ s.wrapper }>
         <div className={ s.sidebar }>
            {
               links.map(link => (
                  <NavLink
                     key={ link.text }
                     to={ link.to }
                     className={ s.link }
                     activeClassName={ s.active }
                     isActive={ (_, { pathname }) => link.path && link.path.includes(pathname) }
                  >
                     { link.text }
                  </NavLink>
               ))
            }
         </div>

         <div className={ s.body }>
            <AdminRouterConfig />
         </div>
      </div>
   )
}

const links = [
   {
      to: '/admin/add-product',
      text: 'Добавить товар',
      path: ['/admin', '/admin/add-product']
   },
   {
      to: '/admin/products-list',
      text: 'Список товара',
      path: ['/admin/products-list']
   }
]

export default AdminPanel