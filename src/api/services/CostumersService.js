const Customer = require('../../models/Customer');

class CustomersServiceAPI {
    static async findAllCustomer() {
        try {
            const customers = await Customer.find({});
            const customerNotFound = customers.length === 0;
            if (customerNotFound) {
                return "There aren't registered customers.";
            }
            return customers;
        } catch (err) {
            return err;
        }
    }

    static async findCustomerByDoc(doc) {
        try {
            const customer = await Customer.findOne({ doc });
            if (!customer) {
                return "There isn't registered customer with this document.";
            }
            return customer;
        } catch (err) {
            return err;
        }
    }

    static async findCustomerById(id) {
        try {
            const customer = await Customer.findOne({ _id: id });
            if (!customer) {
                return "There isn't registered customer with this ID.";
            }
            return customer;
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered customer with this ID.";
            }
            return err;
        }
    }
}

module.exports = CustomersServiceAPI;
