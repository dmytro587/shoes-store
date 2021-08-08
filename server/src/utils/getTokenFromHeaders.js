module.exports = req => {
   const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

   return token ? token : null
}