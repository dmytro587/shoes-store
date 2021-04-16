const { model } = require('mongoose')
const Product = model('Product')

exports.getProducts = async (req, res) => {
   try {
      const pageLimit = req.query.limit
      const page = req.query.page
      const category = req.query.category
      const priceSort = req.query.priceSort
      const priceRange = req.query.priceRange && req.query.priceRange.split('-')
      const sizes = req.query.sizes && req.query.sizes.split(',').map(i => +i)
      const mainOps = {}
      const addOps = {}

      category && (mainOps.categories = { $in: [category] })
      priceSort && (addOps.sort = { price: priceSort })
      sizes && (mainOps.sizes = { $in: sizes })

      if (priceRange) {
         const from = +priceRange[0]
         const to = +priceRange[1]

         if (from > 0 && to > 0) {
            mainOps.price = {
               $gte: from,
               $lte: to
            }
         } else if (priceRange[0] > 0) {
            mainOps.price = { $gte: from }
         } else if (to > 0) {
            mainOps.price = { $lte: to }
         }
      }

      const totalCount = await Product.countDocuments()
      const products = await Product.find(mainOps, null, {
         ...addOps,
         skip: page > 1 ? 5 * (page - 1) : 0,
         limit: +pageLimit || 5
      })

      res.status(200).json({
         products,
         totalCount
      })
   } catch (e) {
      res.status(404).json({
         status: 404,
         message: e.message
      })
   }
}

exports.getProductById = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)

      res.status(200).json(product)
   } catch (e) {
      res.status(404).json({
         status: 404,
         message: e.message
      })
   }
}