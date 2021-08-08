import { lazy } from 'react'

export const ResetPassword = lazy(() => import('./ResetPassword'))
export const NewPassword = lazy(() => import('./NewPassword'))
export const AdminPanel = lazy(() => import('./AdminPanel'))

export { default as Home } from './Home'
export { default as Cart } from './Cart'
export { default as Auth } from './Auth'
export { default as ErrorPage } from './ErrorPage'

