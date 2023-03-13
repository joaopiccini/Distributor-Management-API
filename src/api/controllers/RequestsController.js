const jwt = require('jsonwebtoken');
require('dotenv/config');

class RequestsControllerAPI {
    static async doRequest() {}

    static async findAllRequests() {}

    static async findRequestByAuthor() {}

    static async findRequestById() {}

    static async updateRequest() {}

    static async completeRequest() {}

    static async cancelRequest() {}
}

module.exports = RequestsControllerAPI;
