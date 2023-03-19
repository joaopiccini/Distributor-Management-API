/* eslint-disable prettier/prettier */
const express = require('express');
const RequestsController = require('../controllers/RequestsController');
const Authentication = require('../auth/Authentication');


const router = express.Router();

router
    .get('/api/request', Authentication.validateJWT, RequestsController.findAllRequests)
    .get('/api/request/:id', Authentication.validateJWT, RequestsController.findRequestById)
    .get('/api/request/author/:author', Authentication.validateJWT, RequestsController.findRequestByAuthor)
    .get('/api/request/cod/:cod', Authentication.validateJWT, RequestsController.findRequestByCod)
    .post('/api/request/do', Authentication.validateJWT, RequestsController.doRequest)
    .put('/api/request/:id', Authentication.validateJWT, RequestsController.updateRequestById)
    .put('/api/request/complete/:id', Authentication.validateJWT, RequestsController.completeRequestById)
    .put('/api/request/cancel/:id', Authentication.validateJWT, RequestsController.cancelRequestById)
    .delete('/api/request/:id', Authentication.validateJWT, RequestsController.deleteRequestById)


module.exports = router;
