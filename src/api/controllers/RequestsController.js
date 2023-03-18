const RequestService = require('../services/RequestService');
require('dotenv/config');

class RequestsController {
    static async doRequest() {}

    static async findAllRequests() {}

    static async findRequestByAuthor() {}

    static async findRequestByCod() {}

    static async findRequestById() {}

    static async updateRequestById() {}

    static async completeRequestById() {}

    static async cancelRequestById() {}

    static async deleteRequestById() {}
}

module.exports = RequestsController;
