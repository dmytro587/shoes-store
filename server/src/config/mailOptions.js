const { SENDER_EMAIL, BASE_URL } = require('./index')

const mailOptions = {
   getResetPasswordOpt: (email, token) => ({
      from: `"Shoes shop" <${ SENDER_EMAIL }>`,
      to: email,
      subject: 'Reset password',
      html: `
         <h1>Сброс пароля</h1>
         <p>Если вы хотите сбросить пароль, перейдите по ссылке ниже</p>
         <a href="${BASE_URL}/new-password/${token}">Сбросить пароль</a>
      `
   })
}

module.exports = mailOptions