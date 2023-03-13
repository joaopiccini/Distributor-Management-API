/* eslint-disable prettier/prettier */
const express = require('express')
const ProductsControllerAPI = require('../api/controllers/ProductsController')

const router = express.Router();

router
    .post('/product/register', ProductsControllerAPI.registerProduct)

module.exports = router;
