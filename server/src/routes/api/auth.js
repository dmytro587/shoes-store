const router = require('express').Router()

const { auth } = require('./../../controllers')
const { loginValidator, registrationValidator } = require('./../../utils')

router.post('/login', loginValidator, auth.login)
router.post('/registration', registrationValidator, auth.registration)

module.exports = router