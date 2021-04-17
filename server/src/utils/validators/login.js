const bcrypt = require('bcrypt')
const { model } = require('mongoose')
const { body } = require('express-validator')

async function usernameValidator(value) {
   try {
      const candidate = await model('User').findOne({ username: value })

      if (!candidate) {
         return Promise.reject('Неверное имя')
      }
   } catch (e) {
      console.log(e)
   }
}

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

async function passwordValidator(value, { req }) {
   try {
      const candidate = await model('User').findOne({ email: req.body.email })
      const isValidPassword = await bcrypt.compare(value, candidate.password)

      if (!isValidPassword) {
         return Promise.reject('Неверный пароль')
      }
   } catch (e) {
      console.log(e)
   }
}

module.exports = [
   body('username')
      .isLength({ min: 2, max: 20 })
      .withMessage('Имя должно быть больше 2 и меньше 20 символов')
      .custom(usernameValidator)
      .trim(),
   body('email')
      .isEmail()
      .withMessage('Введите корректный email')
      .custom(emailValidator)
      .normalizeEmail(),
   body('password')
      .isLength({ min: 4, max: 35 })
      .withMessage('Пароль должен быть больше 4 и меньше 35 символов')
      .custom(passwordValidator)
      .trim()
]