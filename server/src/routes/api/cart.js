const router = require('express').Router()

const { checkAuth } = require('../../middlewares')
const { cart } = require('./../../controllers')

router.get('/', checkAuth, cart.getCart)
router.get('/info', checkAuth, cart.getCartInfo)

router.post('/add', checkAuth, cart.addToCart)

router.put('/plus-product-count', checkAuth, cart.plusProductCount)
router.put('/minus-product-count', checkAuth, cart.minusProductCount)
router.put('/clear', checkAuth, cart.clear)

router.delete('/remove/:id', checkAuth, cart.removeFromCart)

module.exports = router