const router = require('express').Router()

const { products } = require('./../../controllers')


router.get('/', products.getProducts)
router.get('/:id', products.getProductById)

module.exports = router