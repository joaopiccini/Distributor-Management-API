/* eslint-disable prettier/prettier */
const express = require('express');
const CustomersController = require("../controllers/CustomersController");
const CustomersControllerAPI = require('../api/controllers/CustomersController');
const Authentication = require('../auth/Authentication');

const router = express.Router();

router
    .get('/customer', CustomersController.findAllCustomers)
    .get('/customer/:id', CustomersController.findCustomerById)
    .post('/customer/create', CustomersController.createCustomer)
    .put('/customer/create', CustomersController.updateCustomer)
    .delete('/customer/create', CustomersController.inativeCustomer)
    .get('/api/customer', Authentication.validateJWT, CustomersControllerAPI.findAllCustomer)
    .get('/api/customer/:id', Authentication.validateJWT, CustomersControllerAPI.findCustomerById)
    .get('/api/customer/doc/:doc', Authentication.validateJWT, CustomersControllerAPI.findCustomerByDoc)

module.exports = router;
