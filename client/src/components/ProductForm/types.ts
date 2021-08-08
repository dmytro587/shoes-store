export interface Option<T = string | number> {
   label: string
   value: T
}

export interface Values {
   name: string
   price: number
   imgUrl: string
   sizes: Option<number>[]
   categories: Option<string>[]
}

type InitialValues = Omit<Values, 'sizes' | 'categories'> & {
   sizes: number[]
   categories: string[]
}

export interface Props {
   onSubmit: (formData: InitialValues) => void
   submitText: string
   initialValues?: InitialValues | null
}