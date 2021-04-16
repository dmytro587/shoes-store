const router = require('express').Router()

router.use('/products', require('./api/products'))
router.use('/auth', require('./api/auth'))
router.use('/cart', require('./api/cart'))

module.exports = router