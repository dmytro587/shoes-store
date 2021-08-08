import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks'
import { selectIsAccessChecking, selectAuthError, checkAccess } from '../../redux/slices/auth'

import { AdminRouters } from '../../navigation'
import { FullscreenLoader } from '../../components'

import { dataForRender } from './../../config'
import s from './AdminPanel.module.sass'


const AdminPanel: React.FC = () => {
   const dispatch          = useAppDispatch()
   const isAccessChecking  = useAppSelector(selectIsAccessChecking)
   const authError         = useAppSelector(selectAuthError)

   useEffect(() => {
      dispatch(checkAccess())
      // eslint-disable-next-line
   }, [])

   if (isAccessChecking) return (
      <FullscreenLoader
         type="Oval"
         height={ 60 }
         width={ 60 }
      />
   )

   if (authError) return (
      <div className={ s.error }>
         <h1>Ошибка <span>{ authError.status }</span></h1>
         <p>{ authError.message }</p>
      </div>
   )

   return (
      <div className={ s.wrapper }>
         <div className={ s.sidebar }>
            {
               dataForRender.ADMIN_NAVIGATION_ITEMS.map(link => (
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
            <AdminRouters />
         </div>
      </div>
   )
}

// <FullscreenLoader
//    type="Oval"
//    color="#000"
//    height={ 60 }
//    width={ 60 }
//    className="fill-spinner"
// />

export default AdminPanel