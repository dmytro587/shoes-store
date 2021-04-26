import { lazy } from 'react'

export const ResetPassword = lazy(() => import('./ResetPassword/ResetPassword'))
export const NewPassword = lazy(() => import('./NewPassword/NewPassword'))

export { default as Home } from './Home/Home'
export { default as Cart } from './Cart/Cart'
export { default as Auth } from './Auth/Auth'
export { default as ErrorPage } from './ErrorPage/ErrorPage'

