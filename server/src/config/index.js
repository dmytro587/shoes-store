module.exports = {
   PORT: process.env.PORT || 5000,
   MONGODB_URI: process.env.MONGODB_URI,
   SECRET_KEY: process.env.SECRET_KEY,
   EMAIL_SERVICE: process.env.EMAIL_SERVICE,
   SENDER_EMAIL: process.env.SENDER_EMAIL,
   PWD_FROM_SENDER_EMAIL: process.env.PWD_FROM_SENDER_EMAIL,
   BASE_URL: 'http://localhost:3000'
}