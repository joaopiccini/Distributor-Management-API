/* eslint-disable prettier/prettier */
const express = require('express');
const Authentication = require('../auth/Authentication');
const ApiController = require("../controllers/ApiController");

const router = express.Router();

router
    .post('/api/token', ApiController.createToken)
    .post('/api/start', Authentication.validateJWT, ApiController.startSystem)

module.exports = router;
