module.exports = (res, message, status = 200) => (
   res.status(status).json({
      status,
      message
   })
)

class Response {
   _base(res, config: { message, status }) {
      return res.status(status).json(config)
   }

   ok(res, message) {
      return this._base(res, {
         message,
         status: 200
      })
   }


}

module.exports = new Response()