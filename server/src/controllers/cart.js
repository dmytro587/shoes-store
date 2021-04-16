const getMappedItems = items => {
   return items.map(item => ({
      ...item.productId._doc,
      count: item.count,
      totalPrice: item.totalPrice
   }))
}

exports.getCart = async (req, res) => {
   try {
      const user = await req.user
         .populate('cart.items.productId')
         .execPopulate()

      res.status(200).json({
         products: getMappedItems(user.cart.items),
         totalCount: user.cart.totalCount,
         totalPrice: user.cart.totalPrice
      })
   } catch (e) {
      console.log(__filename, e)
      res.status(500).json({
         message: e,
         status: 500
      })
   }
}

exports.getCartInfo = async (req, res) => {
   try {
      res.status(200).json({
         totalCount: req.user.cart.totalCount,
         totalPrice: req.user.cart.totalPrice
      })
   } catch (e) {
      console.log(e)
      res.status(500).json({
         status: 500,
         message: e
      })
   }

}

exports.addToCart = async (req, res) => {
   try {
      await req.user.addToCart(req.body.productId)

      res.status(200).json({
         message: 'Товар добавлен в корзину'
      })
   } catch (e) {
      console.log(__filename, e)
      res.status(500).json({
         message: e,
         status: 500
      })
   }
}

exports.plusProductCount = async (req, res) => {
   try {
      await req.user.plusProductCount(req.body.productId)

      const user = await req.user
         .populate('cart.items.productId')
         .execPopulate()

      res.status(200).json({
         products: getMappedItems(user.cart.items),
         totalCount: user.cart.totalCount,
         totalPrice: user.cart.totalPrice
      })
   } catch (e) {
      console.log(e)
   }
}

exports.minusProductCount = async (req, res) => {
   try {
      await req.user.minusProductCount(req.body.productId)

      const user = await req.user
         .populate('cart.items.productId')
         .execPopulate()

      res.status(200).json({
         products: getMappedItems(user.cart.items),
         totalCount: user.cart.totalCount,
         totalPrice: user.cart.totalPrice
      })
   } catch (e) {
      console.log(e)
      res.status(500).json({
         status: 500,
         message: e
      })
   }
}

exports.removeFromCart = async (req, res) => {
   try {
      await req.user.removeProductFromCart(req.params.id)

      const user = await req.user
         .populate('cart.items.productId')
         .execPopulate()

      res.status(200).json({
         products: getMappedItems(user.cart.items),
         totalCount: user.cart.totalCount,
         totalPrice: user.cart.totalPrice
      })
   } catch (e) {
      console.log(e)
   }

}

exports.clear = async (req, res) => {
   try {
      await req.user.clearCart()

      res.status(200).json({
         message: 'Коризина очищена'
      })
   } catch (e) {
      console.log(e)
      res.status(500).json({
         status: 500,
         message: e
      })
   }

}