const { body } = require('express-validator')
const confirmPassword = require('./helpers/confirmPassword')

module.exports = [
   body('newPassword')
      .isLength({ min: 4, max: 35 })
      .withMessage('Пароль должен быть больше 4 и меньше 35 символов')
      .trim(),
   body('confirm')
      .custom(confirmPassword)
]