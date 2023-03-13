/* eslint-disable prettier/prettier */
const express = require('express')
const RequestsControllerAPI = require('../api/controllers/RequestsController')

const router = express.Router();

router
    .post('/request/do', RequestsControllerAPI.doRequest)

module.exports = router;
