const confirmPassword = async (value, { req }) => {
   if (value !== req.body.password) {
      return Promise.reject('Пароли не совпадают')
   }
}

module.exports = confirmPassword