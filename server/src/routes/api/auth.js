const router = require('express').Router()

const { checkAuth, checkRole } = require('../../middlewares')
const { auth } = require('./../../controllers')
const {
   loginValidator,
   registrationValidator,
   resetPasswordValidator,
   newPasswordValidator
} = require('./../../utils')

const { admin: adminRole } = require('../../config/roles')


router.get('/check-auth', checkAuth, auth.autoLogin)
router.get('/check-access', checkRole([adminRole]), auth.checkAccess)

router.post('/login', loginValidator, auth.login)
router.post('/registration', registrationValidator, auth.registration)
router.post('/reset-password', resetPasswordValidator, auth.resetPassword)
router.post('/new-password', newPasswordValidator, auth.newPassword)

module.exports = router