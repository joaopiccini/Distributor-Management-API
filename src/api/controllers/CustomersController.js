const CustomersServiceAPI = require('../services/CostumersService');
require('dotenv/config');

class CustomersControllerAPI {
    static async findAllCustomer(req, res) {
        try {
            const response = await CustomersServiceAPI.findAllCustomer();
            return res.json(response);
        } catch (err) {
            return res.json(err);
        }
    }

    static async findCustomerByDoc(req, res) {
        try {
            const response = await CustomersServiceAPI.findCustomerByDoc(
                req.params.doc
            );
            return res.json(response);
        } catch (err) {
            return res.json(err);
        }
    }

    static async findCustomerById(req, res) {
        try {
            const response = await CustomersServiceAPI.findCustomerById(
                req.params.id
            );
            return res.json(response);
        } catch (err) {
            return res.json(err);
        }
    }
}

module.exports = CustomersControllerAPI;
