const REQUIRED_FIELD_MESSAGE = '*поле обязательно'

type Errors<T extends object> = {
   [P in keyof T]: typeof REQUIRED_FIELD_MESSAGE
}

export default function requiredFieldValidator<T extends object, U extends keyof T>(
   values: T,
   propsNames: U[]
) {
   const errors = {} as Errors<T>

   propsNames.forEach(name => {
      if (!values[name]) {
         errors[name] = REQUIRED_FIELD_MESSAGE
      }
   })

   return errors
}