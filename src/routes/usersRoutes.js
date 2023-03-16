/* eslint-disable prettier/prettier */
const express = require('express')
const UsersController = require("../controllers/UsersController")

const router = express.Router();

router
    .post('/register',UsersController.createUser)
    .post('/login',UsersController.loginUser)
    .post('/api/token', UsersController.createToken)

module.exports = router;
