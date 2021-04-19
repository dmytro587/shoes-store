const { body } = require('express-validator')
const { model } = require('mongoose')

async function emailValidator(value) {
   try {
      const candidate = await model('User').findOne({ email: value })

      if (!candidate) {
         return Promise.reject('Пользователя с таким email не существует')
      }
   } catch (e) {
      console.log(e)
   }
}

module.exports = [
   body('email')
      .isEmail()
      .custom(emailValidator)
      .normalizeEmail()
]