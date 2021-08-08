import { AxiosError } from 'axios'

export type CategoryFilter = 'trainers' | 'boots' | null

export type OrderFilter = 'asc' | 'desc'

export interface ParamTypes { // можно изменить на UseParamsTypes
   id: string
}

export interface ErrorData {
   message: string
   status: number
}

export type APIError<T = ErrorData> = AxiosError<T>

// export interface ProductData {
//    name: string,
//    imgUrl: string,
//    price: {
//       type: number,
//       default: 0
//    },
//    categories: string[],
//    sizes: number[]
// }

export interface Product {
   _id?: string
   name: string
   price: number
   imgUrl: string
   sizes: number[]
   categories: string[]
}

export interface CartItem extends Product {
   _id: string
   count: number
   totalPrice: number
}

export interface PriceFilter {
   order: OrderFilter,
   from: number
   to: number
}

export interface ProductsFilters {
   currentPage: number
   pageLimit: number,
   price: PriceFilter
   sizes: number[]
   category: string | null // TODO: уточнить тип
}

export interface CartItem extends Product {
   count: number
   totalPrice: number
}

export interface UserData {
   username: string
   email: string
   password: string
}

export interface RegistrationData {
   username: string
   email: string
   password: string
   confirm: string
}

export interface NewPasswordData {
   newPassword: string
   confirm: string
   token: string
}

export interface LoginResponse {
   token: string
}

export interface JustMessage {
   message: string
}

export interface CartData extends CartInfo {
   products: CartItem[]
}

export interface CartInfo {
   totalCount: number
   totalPrice: number
}

export interface FetchProductsResponse {
   products: Product[]
   totalCount: number
}