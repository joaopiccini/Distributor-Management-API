/* eslint-disable prettier/prettier */
const express = require('express');
const CustomersController = require("../controllers/CustomersController");
const Authentication = require('../auth/Authentication');

const router = express.Router();

router
    .get('/api/customer', Authentication.validateJWT, CustomersController.findAllCustomer)
    .get('/api/customer/:id', Authentication.validateJWT, CustomersController.findCustomerById)
    .get('/api/customer/doc/:doc', Authentication.validateJWT, CustomersController.findCustomerByDoc)
    .post('/api/customer/register', Authentication.validateJWT, CustomersController.createCustomer)
    .put('/api/customer/:doc', Authentication.validateJWT, CustomersController.updateCustomer)
    .put('/api/customer/inactive/:doc', Authentication.validateJWT, CustomersController.inativeCustomer)
    .put('/api/customer/active/:doc', Authentication.validateJWT, CustomersController.activateCustomer)

module.exports = router;
