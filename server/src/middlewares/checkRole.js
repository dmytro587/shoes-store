const jwt = require('jsonwebtoken')

const { getTokenFromHeaders } = require('../utils')
const { SECRET_KEY } = require('./../config')

// this middleware is temporarily not used
module.exports = roles => (req, res, next) => {
   const token = getTokenFromHeaders(req)

   if (!token) {
      return res.status(403).json({
         status: 403,
         message: "Пользователь не авторизован"
      })
   }

   try {
      const { roles: userRoles } = jwt.verify(token, SECRET_KEY)
      let hasAccess = false

      roles.forEach(role => {
         if (userRoles.includes(role)) {
            hasAccess = true
         }
      })

      if (!hasAccess) {
         return res.status(403).json({
            status: 403,
            message: "Отказано в доступе"
         })
      }

      next()
   } catch (e) {
      console.log(e)
      return res.status(403).json({
         status: 403,
         message: "Пользователь не авторизован"
      })
   }
}