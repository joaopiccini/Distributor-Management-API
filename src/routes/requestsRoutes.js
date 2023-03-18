/* eslint-disable prettier/prettier */
const express = require('express');
const RequestsController = require('../api/controllers/RequestsController');

const router = express.Router();

router
    .post('/request/do', RequestsController.doRequest)

module.exports = router;
