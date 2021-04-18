const router = require('express').Router()

const { checkAuth } = require('../../middlewares')
const { auth } = require('./../../controllers')
const { loginValidator, registrationValidator } = require('./../../utils')

router.get('/check-auth', checkAuth, auth.autoLogin)

router.post('/login', loginValidator, auth.login)
router.post('/registration', registrationValidator, auth.registration)

module.exports = router