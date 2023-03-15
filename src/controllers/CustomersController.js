const CustomersService = require('../services/CustomersService');
require('dotenv/config');

class CustomersController {
    static async createCustomer(req, res) {
        try {
            const response = await CustomersService.createCustomer(req.body);
            const responseIsError = typeof response === 'string';
            if (responseIsError) {
                return res.json(response);
            }
            return res.json({
                created: true,
                message: 'Customer created in database',
                customer: response,
            });
        } catch (err) {
            return res.json(err);
        }
    }

    static async findAllCustomers() {}

    static async findCustomerByDoc() {}

    static async findCustomerById() {}

    static async updateCustomer() {}

    static async inativeCustomer() {}
}

module.exports = CustomersController;
