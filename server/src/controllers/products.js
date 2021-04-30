const { validationResult } = require('express-validator')
const { model } = require('mongoose')
const Product = model('Product')

exports.getProducts = async (req, res) => {
   const PAGE_LIMIT = 6

   try {
      const pageLimit = +req.query.limit
      const page = +req.query.page
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

      const products = await Product.find(mainOps, null, {
         ...addOps,
         skip: PAGE_LIMIT * (page - 1),
         limit: pageLimit || PAGE_LIMIT
      })

      const totalCount = await Product.countDocuments(mainOps)

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

exports.addProduct = async (req, res) => {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
      return res.status(400).json({
         status: 400,
         message: errors.array()[0].msg
      })
   }

   try {
      const { name, price, imgUrl, sizes, categories } = req.body
      const Product = model('Product')
      const product = new Product({
         name,
         price,
         imgUrl,
         sizes,
         categories
      })

      await product.save()

      res.status(200).json({
         message: 'Товар успешно добавлен'
      })
   } catch (e) {
      console.log(e)
      res.status(400).json({
         status: 400,
         message: 'Что-то пошло не так'
      })
   }
}

exports.remove = async (req, res) => {
   try {
      await Product.findByIdAndDelete(req.params.id,  err => {
         if (err) {
            return res.status(400).json({
               status: 400,
               message: 'Такого товара нет'
            })
         }

         return res.status(200).json({
            message: 'Товар успешно удален'
         })
      })

   } catch (e) {
      console.log(e)
      res.status(500).json({
         status: 500,
         message: e.message
      })
   }
}

exports.edit = async (req, res) => {
   try {
      const product = await Product.findById(req.body.id)

      if (!product) {
         return res.status(400).json({
            status: 400,
            message: 'Такого товара нет'
         })
      }

      Object.keys(req.body).map(key => {
         if (key !== 'id' && req.body[key]) {
            product[key] = req.body[key]
         }
      })

      await product.save()

      return res.status(200).json({
         message: 'Товар успешно изменён '
      })
   } catch (e) {
      console.log(e)
      res.status(500).json({
         status: 500,
         message: e.message
      })
   }
}