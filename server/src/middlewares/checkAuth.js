const jwt = require('jsonwebtoken')
const { model } = require('mongoose')

const { getTokenFromHeaders } = require('../utils')
const { SECRET_KEY } = require('./../config')

const User = model('User')

module.exports = async (req, res, next) => {
   const token = getTokenFromHeaders(req)

   if (!token) {
      return res.status(403).json({
         message: "Пользователь не авторизован",
         status: 403
      })
   }

   try {
      const decoded = jwt.verify(token, SECRET_KEY)
      req.user = await User.findById(decoded.id)

      next()
   } catch (e) {
      console.log(e)
      return res.status(403).send({
         message: 'Пользователь не авторизован',
         status: 403
      })
   }
}