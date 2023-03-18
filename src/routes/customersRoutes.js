/* eslint-disable prettier/prettier */
const express = require('express');
const CustomersController = require("../controllers/CustomersController");
const Authentication = require('../auth/Authentication');

const router = express.Router();

router
    .get('/customer', CustomersController.findAllCustomer)
    .get('/customer/:id', CustomersController.findCustomerById)
    .get('/customer/doc/:doc', CustomersController.findCustomerByDoc)
    .post('/customer/create', CustomersController.createCustomer)
    .put('/customer/:doc', CustomersController.updateCustomer)
    .put('/customer/inactive/:doc', CustomersController.inativeCustomer)
    .put('/customer/active/:doc', CustomersController.activateCustomer)
    .get('/api/customer', Authentication.validateJWT, CustomersController.findAllCustomerAPI)
    .get('/api/customer/:id', Authentication.validateJWT, CustomersController.findCustomerByIdAPI)
    .get('/api/customer/doc/:doc', Authentication.validateJWT, CustomersController.findCustomerByDocAPI)

module.exports = router;
