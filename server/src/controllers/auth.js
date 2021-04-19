const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const { model } = require('mongoose')
const crypto = require('crypto')

const nmTransporter = require('../config/nmTransporter')
const { getResetPasswordOpt } = require('./../config/mailOptions')
const { user: userRole } = require('../config/roles')
const { SECRET_KEY } = require('../config')

const User = model('User')

const generateAccessToken = (id, roles) => {
   return jwt.sign({ id, roles }, SECRET_KEY, {
      expiresIn: '24h'
   })
}

exports.autoLogin = (req, res) => {
   res.status(200).json({
      message: 'Авторизация прошла успешно'
   })
}

exports.login = async (req, res) => {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
      return res.status(400).json({
         message: errors.array()[0].msg,
         status: 400
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
         message: 'Что-то пошло не так, попробуйте позже',
         status: 400
      })
   }
}

exports.registration = async (req, res) => {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
      return res.status(400).json({
         message: errors.array()[0].msg,
         status: 400
      })
   }

   try {
      const { username, email, password } = req.body
      const candidate = await User.findOne({ email })

      if (candidate) {
         return res.status(400).json({
            message: 'Такой пользователь уже есть' ,
            status: 400
         })
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
         message: 'Ошибка регистрации, попробуйте позже',
         status: 400
      })
   }
}

exports.resetPassword = async (req, res) => {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
      return res.status(400).json({
         message: errors.array()[0].msg,
         status: 400
      })
   }

   crypto.randomBytes(32, async (err, buffer) => {
      if (err) throw err

      const token = buffer.toString('hex')
      const { email } = req.body

      try {
         await nmTransporter.sendMail(getResetPasswordOpt(email, token))
         const user = await User.findOne({ email })

         user.resetToken = token
         user.resetTokenExp = Date.now() * 36e5 // + 1hour

         await user.save()

         res.status(200).json({
            message: 'Вам на почту отправлено письмо с дальнейшими указаниями'
         })
      } catch (e) {
         console.dir(e)
         res.status(500).json({
            status: 500,
            message: 'Произошла не предвиденная ошибка, попробуйте позже'
         })
      }
   })
}

exports.newPassword = async (req, res) => {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
      return res.status(400).json({
         message: errors.array()[0].msg,
         status: 400
      })
   }

   try {
      const { token, password } = req.body
      const user = await User.findOne({
         resetToken: token,
         resetTokenExp: { $gt: Date.now() }
      })

      if (user) {
         user.password = await bcrypt.hash(password, 12)
         user.resetToken = null
         user.resetTokenExp = null

         await user.save()

         res.status(200).json({
            message: 'Пароль успешно изменён'
         })
      } else {
         res.status(400).json({
            status: 400,
            message: 'Время действия токена истекло'
         })
      }
   } catch (e) {
      console.log(e)
      res.status(500).json({
         status: 500,
         message: 'Произошла не предвиденная ошибка, попробуйте позже'
      })
   }
}