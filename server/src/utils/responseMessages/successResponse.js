module.exports = (res, message, status = 200) => (
   res.status(status).json({
      status,
      message
   })
)