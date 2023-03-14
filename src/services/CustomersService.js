const Customer = require('../models/Customer');

class CustomersService {
    static async createCustomer(body) {
        try {
            const customerExists = await Customer.findOne({ name: body.name });
            if (customerExists) {
                return 'The customer is already registered';
            }
            const customer = await Customer.create(body);
            return customer;
        } catch (err) {
            return err;
        }
    }

    static async findAllCustomers() {}

    static async findCustomerByDoc() {}

    static async findCustomerById() {}

    static async updateCustomer() {}

    static async inativeCustomer() {}
}

module.exports = CustomersService;
