/* eslint-disable prettier/prettier */
const express = require('express')
const UsersController = require("../controllers/UsersController")
const UsersControllerAPI = require('../api/controllers/UsersController')

const router = express.Router();

router
    .post('/register',UsersController.createUser)
    .post('/login',UsersController.loginUser)
    .post('/api/createUser',UsersControllerAPI.createUserAPI)
    .post('/api/token',UsersControllerAPI.createToken)

module.exports = router;
