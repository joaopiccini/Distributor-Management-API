const express = require('express')
const ProductsController = require('../controllers/ProductsController')

const router = express.Router();

router
    .post('/product/register', ProductsController.registerProduct)

module.exports = router;
