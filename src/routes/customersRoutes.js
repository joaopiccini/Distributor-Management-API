/* eslint-disable prettier/prettier */
const express = require('express');
const CustomersController = require("../controllers/CustomersController");
const CustomersControllerAPI = require('../api/controllers/CustomersController');
const Validate = require('./auth/Validate');

const router = express.Router();

router
    .get('/customer', CustomersController.findAllCustomers)
    .get('/customer/:id', CustomersController.findCustomerById)
    .get('/customer/doc/:doc', Validate.validateJWT, CustomersController.findCustomerByDoc)
    .post('/customer/create', CustomersController.createCustomer)
    .put('/customer/create', CustomersController.updateCustomer)
    .delete('/customer/create', CustomersController.inativeCustomer)
    .get('/api/customer', Validate.validateJWT, CustomersControllerAPI.findAllCustomer)
    .get('/api/customer/:id', Validate.validateJWT, CustomersControllerAPI.findCustomerById)
    .get('/api/customer/doc/:doc', Validate.validateJWT, CustomersControllerAPI.findCustomerByDoc)

module.exports = router;
