/* eslint-disable prettier/prettier */
const express = require('express')
const CustomersController = require("../controllers/CustomersController")
const CustomersControllerAPI = require('../api/controllers/CustomersController')

const router = express.Router();

router
    .get('/customer/create', CustomersController.createCustomer)

module.exports = router;
