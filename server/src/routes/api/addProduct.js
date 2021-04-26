const router = require('express').Router()
const { addProduct } = require('./../../controllers')

router.post('add-product', addProduct.add)

module.exports = router

