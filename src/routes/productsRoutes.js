/* eslint-disable prettier/prettier */
const express = require('express');
const ProductsController = require('../controllers/ProductsController');
const Authentication = require('../auth/Authentication');

const router = express.Router();

router
    .get('/api/product', Authentication.validateJWT, ProductsController.findAllProducts)
    .get('/api/product/:id', Authentication.validateJWT, ProductsController.findProductById)
    .get('/api/product/type/:type', Authentication.validateJWT, ProductsController.findProductsByType)
    .post('/api/product/register', Authentication.validateJWT, ProductsController.registerProduct)
    .put('/api/product/:id', Authentication.validateJWT, ProductsController.updateProductById)
    .delete('/api/product/:id', Authentication.validateJWT, ProductsController.deleteProductById)

module.exports = router;
