const requiredFieldValidator = (values, names) => {
   const errors = {}

   names.forEach(name => {
      if (!values[name]) {
         errors[name] = '*поле обязательно'
      }
   })

   return errors
}

export default requiredFieldValidator