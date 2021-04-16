const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')

const { PORT, MONGODB_URI } = require('./config')

const app = express()

app.use(express.static(`${__dirname}/public`))
app.use(express.json())
app.use(cors())
app.use(helmet())

// Models
require('./models/Product')
require('./models/User')

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






