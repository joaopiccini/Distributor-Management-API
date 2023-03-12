const express = require('express')
const UsersController = require("../controllers/UsersController")

const router = express.Router();

router
    .post('/register',UsersController.createUser)
    .post('/login',UsersController.loginUser)
    .post('/token',UsersController.createToken)

module.exports = router;
