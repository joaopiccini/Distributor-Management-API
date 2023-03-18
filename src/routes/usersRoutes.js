/* eslint-disable prettier/prettier */
const express = require('express');
const UsersController = require("../controllers/UsersController");

const router = express.Router();

router
    .get('/user',UsersController.findAllUsers)
    .get('/user/:id',UsersController.findUserById)
    .post('/register',UsersController.createUser)
    .post('/login',UsersController.loginUser)
    .post('/api/token', UsersController.createToken)
    .put('/user/inactive/:email',UsersController.inactivateUser)
    .put('/user/active/:email',UsersController.activateUser)

module.exports = router;
