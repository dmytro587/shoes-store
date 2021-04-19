const nodemailer = require("nodemailer")
const { EMAIL_SERVICE, SENDER_EMAIL, PWD_FROM_SENDER_EMAIL } = require('./index')

const nmTransporter = nodemailer.createTransport({
   service: EMAIL_SERVICE,
   auth: {
      user: SENDER_EMAIL,
      pass: PWD_FROM_SENDER_EMAIL
   },
})

module.exports = nmTransporter