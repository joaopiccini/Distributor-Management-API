/* eslint-disable prettier/prettier */
const express = require('express')
const ProductsControllerAPI = require('../api/controllers/ProductsController')

const router = express.Router();

router
    .get('/product', ProductsControllerAPI.findAllProducts)
    .get('/product/:id', ProductsControllerAPI.findProductById)
    .get('/product/type/:type', ProductsControllerAPI.findProductsByType)
    .post('/product/register', ProductsControllerAPI.registerProduct)
    .put('/product/:id', ProductsControllerAPI.updateProductById)
    .delete('/product/:id', ProductsControllerAPI.deleteProductById)

module.exports = router;
