const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const { model } = require('mongoose')

const { user: userRole } = require('../config/roles')
const { SECRET_KEY } = require('../config')
const { getTokenFromHeaders } = require('../utils')

const User = model('User')

const generateAccessToken = (id, roles) => {
   return jwt.sign({ id, roles }, SECRET_KEY, {
      expiresIn: '24h'
   })
}

exports.login = async (req, res) => {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
      return res.status(400).json({
         message: errors.array()[0].msg
      })
   }

   try {
      const { email } = req.body
      const candidate = await User.findOne({ email })

      return res.status(200).json({
         token: generateAccessToken(candidate._id, candidate.roles)
      })

   } catch (e) {
      console.log(__filename, e)
      res.status(400).json({
         message: 'Что-то пошло не так, попробуйте позже'
      })
   }
}

exports.registration = async (req, res) => {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
      return res.status(400).json({
         message: errors.array()[0].msg
      })
   }

   try {
      const { username, email, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) {
         return res.status(400).json({ message: 'Такой пользователь уже есть' })
      }

      const hashPassword = await bcrypt.hash(password, 12)
      const user = new User({
         username,
         email,
         password: hashPassword,
         roles: [userRole]
      })

      await user.save()

      res.status(200).json({
         message: 'Регистрация прошла успешно'
      })
   } catch (e) {
      console.log(__filename, e)
      res.status(400).json({
         message: 'Ошибка регистрации, попробуйте позже'
      })
   }
}