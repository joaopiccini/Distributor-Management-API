const Customer = require('../../models/Customer');
const Service = require('./Services');

class CustomersServiceAPI extends Service {
    constructor() {
        super(Customer);
    }

    static async findCustomerByDoc(doc) {
        try {
            console.log(this.model);
            return await this.model.findOne({ doc });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered customer with this document.";
            }
            return err;
        }
    }
}

module.exports = CustomersServiceAPI;
