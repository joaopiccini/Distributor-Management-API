const CustomersServiceAPI = require('../services/CostumersService');
require('dotenv/config');

class CustomersControllerAPI {
    static async findAllCustomer(req, res) {
        try {
            const customers = await CustomersServiceAPI.findAllCustomer();
            const customerNotFound = customers.length === 0;
            if (customerNotFound) {
                return "There aren't registered customers.";
            }
            return res.json(customers);
        } catch (err) {
            return res.json(err);
        }
    }

    static async findCustomerByDoc(req, res) {
        try {
            const { doc } = req.params;
            const customer = await CustomersServiceAPI.findCustomerByDoc(doc);
            if (!customer) {
                return "There isn't registered customer with this document.";
            }
            return res.json(customer);
        } catch (err) {
            return res.json(err);
        }
    }

    static async findCustomerById(req, res) {
        try {
            const { id } = req.params;
            const customer = await CustomersServiceAPI.findCustomerById(id);
            if (!customer) {
                return "There isn't registered customer with this ID.";
            }
            return res.json(customer);
        } catch (err) {
            return res.json(err);
        }
    }
}

module.exports = CustomersControllerAPI;
