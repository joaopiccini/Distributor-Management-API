/* eslint-disable prettier/prettier */
const express = require('express');
const ProductsControllerAPI = require('../api/controllers/ProductsController');
const Validate = require('../auth/Validate');

const router = express.Router();

router
    .get('/api/product', Validate.validateJWT, ProductsControllerAPI.findAllProducts)
    .get('/api/product/:id', Validate.validateJWT, ProductsControllerAPI.findProductById)
    .get('/api/product/type/:type', Validate.validateJWT, ProductsControllerAPI.findProductsByType)
    .post('/api/product/register', Validate.validateJWT, ProductsControllerAPI.registerProduct)
    .put('/api/product/:id', Validate.validateJWT, ProductsControllerAPI.updateProductById)
    .delete('/api/product/:id', Validate.validateJWT, ProductsControllerAPI.deleteProductById)

module.exports = router;
