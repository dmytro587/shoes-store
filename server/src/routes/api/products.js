const router = require('express').Router()

const { products } = require('./../../controllers')
const { addProductValidator } = require('./../../utils')
const { checkRole } = require('./../../middlewares')
const { admin: adminRole } = require('./../../config')

router.get('/', products.getProducts)
router.get('/:id', products.getProductById)

router.post('/add-product', [checkRole([adminRole]), addProductValidator], products.addProduct)
router.put('/edit', checkRole([adminRole]), products.edit)
router.delete('/remove/:id', checkRole([adminRole]), products.remove)

module.exports = router