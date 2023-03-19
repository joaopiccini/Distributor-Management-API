/* eslint-disable prettier/prettier */
const express = require('express');
const UsersController = require("../controllers/UsersController");
const Authentication = require('../auth/Authentication');

const router = express.Router();

router
    .get('/api/user', Authentication.validateJWT, UsersController.findAllUsers)
    .get('/api/user/:id',Authentication.validateJWT, UsersController.findUserById)
    .post('/register',UsersController.createUser)
    .post('/login',UsersController.loginUser)
    .put('/api/user/inactive/:email',Authentication.validateJWT, UsersController.inactivateUser)
    .put('/api/user/active/:email',Authentication.validateJWT, UsersController.activateUser)

module.exports = router;
