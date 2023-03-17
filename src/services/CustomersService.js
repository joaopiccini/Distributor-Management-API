const Customer = require('../models/Customer');

class CustomersService {
    static async createCustomer(customerData) {
        try {
            return await Customer.create(customerData);
        } catch (err) {
            return err;
        }
    }

    static async findAllCustomers() {
        try {
            return await Customer.find({});
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered customer with this document.";
            }
            return err;
        }
    }

    static async findCustomerByDoc(doc) {
        try {
            return await Customer.findOne({ doc });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered customer with this document.";
            }
            return err;
        }
    }

    static async findCustomerById(id) {
        try {
            return await Customer.findOne({ _id: id });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered customer with this document.";
            }
            return err;
        }
    }

    static async updateCustomer() {}

    static async inativeCustomer() {}
}

module.exports = CustomersService;
