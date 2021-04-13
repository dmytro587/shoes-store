const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const { PORT, MONGODB_URI } = require('./config')

const app = express()

app.use(express.static(`${__dirname}/public`))
app.use(cors())

// Models
require('./models/Product')

// Routes
app.use('/api', require('./routes'))

// Mongoose connection
mongoose.connect(
   MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true
}, err => {
   if (err) throw err

   app.listen(PORT, () => {
      console.log(`Server has been started on ${PORT} port`)
   })
})




