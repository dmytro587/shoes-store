const { body } = require('express-validator')

const sizesValidator = value => value.some(elem => typeof elem === 'number')

const categoriesValidator = async value => {
   if (value.length === 0) return Promise.reject('Не выбраны категории')

   return value.some(elem => typeof elem === 'string')
}

const priceValidator = async value => {
   if (Math.trunc(+value) !== +value) return Promise.reject('Цена должна быть целым числом')
}

module.exports = [
   body('name')
      .isLength({ min: 10, max: 50 })
      .withMessage('Название должно быть больше 10 и меньше 50 символов')
      .trim(),
   body('imgUrl')
      .isURL()
      .withMessage('Введите корректный URL')
      .trim(),
   body('price')
      .isNumeric()
      .withMessage('Введите корректную цену')
      .custom(priceValidator),
   body('sizes')
      .isArray({ min: 1 })
      .custom(sizesValidator),
   body('categories')
      .isArray({ min: 1 })
      .custom(categoriesValidator)
]