const Customer = require('../../models/Customer');

class CustomersServiceAPI {
    static async findAllCustomer() {
        try {
            return await Customer.find({});
        } catch (err) {
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
                return "There isn't registered customer with this ID.";
            }
            return err;
        }
    }
}

module.exports = CustomersServiceAPI;
