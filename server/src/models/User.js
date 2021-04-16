const { Schema, model } = require('mongoose')
const { user: userRole } = require('./../config/roles')

const userSchema = new Schema({
   username: {
      type: String,
      required: true
   },
   email: {
     type: String,
      unique: true,
     required: true
   },
   password: {
      type: String,
      required: true
   },
   roles: [
      {
         type: String,
         default: userRole
      }
   ],
   cart: {
      totalPrice: {
         type: Number,
         default: 0
      },
      totalCount: {
         type: Number,
         default: 0
      },
      items: [
         {
            productId: {
               type: Schema.Types.ObjectId,
               ref: 'Product'
            },
            count: {
               type: Number,
               default: 0
            },
            totalPrice: {
               type: Number,
               default: 0
            }
         }
      ]
   }
})

userSchema.methods.addToCart = async function(productId) {
   const product = await model('Product').findById(productId)
   const { cart } = this
   const index = cart.items.findIndex(i => i.productId.toString() === productId.toString())

   if (index >= 0) {
      cart.items[index].count += 1
      cart.items[index].totalPrice += product.price
   } else {
      this.cart.items.push({
         productId,
         count: 1,
         totalPrice: product.price
      })
   }

   this.cart.totalCount += 1
   this.cart.totalPrice += product.price

   return this.save()
}

userSchema.methods.plusProductCount = async function(productId) {
   const cart = this.cart
   const index = cart.items.findIndex(i => i.productId.toString() === productId)
   const item = cart.items[index]
   const { price: productPrice } = await model('Product')
      .findById(productId)
      .select('price')

   if (item) {
      item.count += 1
      item.totalPrice += productPrice
      cart.totalPrice += productPrice
      cart.totalCount += 1

      return this.save()
   }
}

userSchema.methods.minusProductCount = async function(productId) {
   const cart = this.cart
   const index = cart.items.findIndex(i => i.productId.toString() === productId)
   const item = cart.items[index]

   const product = await model('Product')
      .findById(productId)
      .select('price')

   if (item && (+item.count !== 1))  {
      item.count -= 1
      item.totalPrice -= product.price
      cart.totalPrice -= product.price
      cart.totalCount -= 1

      return this.save()
   }
}

userSchema.methods.removeProductFromCart = async function(productId) {
   const cart = this.cart
   const index = cart.items.findIndex(i => i.productId.toString() === productId)
   const item = cart.items[index]

   const product = await model('Product')
      .findById(productId)
      .select('price')

   if (item) {
      cart.items = cart.items.filter(i => i.productId.toString() !== productId)
      cart.totalPrice -= product.price
      cart.totalCount -= 1

      return this.save()
   }
}

userSchema.methods.clearCart = function() {
   this.cart.totalPrice = 0
   this.cart.totalCount = 0
   this.cart.items = []

   return this.save()
}

module.exports = model('User', userSchema)
