/* eslint-disable prettier/prettier */
const express = require('express');
const ProductsControllerAPI = require('../api/controllers/ProductsController');
const Authentication = require('../auth/Authentication');

const router = express.Router();

router
    .get('/api/product', Authentication.validateJWT, ProductsControllerAPI.findAllProducts)
    .get('/api/product/:id', Authentication.validateJWT, ProductsControllerAPI.findProductById)
    .get('/api/product/type/:type', Authentication.validateJWT, ProductsControllerAPI.findProductsByType)
    .post('/api/product/register', Authentication.validateJWT, ProductsControllerAPI.registerProduct)
    .put('/api/product/:id', Authentication.validateJWT, ProductsControllerAPI.updateProductById)
    .delete('/api/product/:id', Authentication.validateJWT, ProductsControllerAPI.deleteProductById)

module.exports = router;
