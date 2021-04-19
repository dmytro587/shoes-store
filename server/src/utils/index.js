module.exports = {
   getTokenFromHeaders: require('./getTokenFromHeaders'),
   loginValidator: require('./validators/login'),
   registrationValidator: require('./validators/registration'),
   resetPasswordValidator: require('./validators/resetPassword'),
   newPasswordValidator: require('./validators/newPassword')
}