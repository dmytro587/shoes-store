const { Schema, model } = require('mongoose')

const productSchema = new Schema({
   name: String,
   imgUrl: String,
   price: {
      type: Number,
      default: 0
   },
   categories: [String],
   sizes: [Number]
})

module.exports = model('Product', productSchema)