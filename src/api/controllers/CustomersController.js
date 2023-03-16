const CustomersServiceAPI = require('../services/CostumersService');
require('dotenv/config');

class CustomersControllerAPI {
    static async findAllCustomer(req, res) {
        try {
            const customers = await CustomersServiceAPI.findAll();
            const customersQuantity = customers.length;
            if (customersQuantity === 0) {
                return "There aren't registered customers.";
            }
            const customersToSent = [];
            for (let i = 0; i < customersQuantity; i++) {
                const customer = {
                    id: customer[i]._id,
                    name: customer[i].name,
                    document: customer[i].doc,
                    phone: customer[i].phone,
                };
                customersToSent.push(customer);
            }
            return res.status(200).json(customersToSent);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findCustomerByDoc(req, res) {
        try {
            const { doc } = req.params;
            const customer = await CustomersServiceAPI.findCustomerByDoc(doc);
            if (!customer) {
                return "There isn't registered customer with this document.";
            }
            return res.status(200).json({
                customer: {
                    id: customer._id,
                    name: customer.name,
                    document: customer.doc,
                    phone: customer.phone,
                },
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findCustomerById(req, res) {
        try {
            const { id } = req.params;
            const customer = await CustomersServiceAPI.findCustomerById(id);
            if (!customer) {
                return "There isn't registered customer with this ID.";
            }
            return res.status(200).json({
                customer: {
                    id: customer._id,
                    name: customer.name,
                    document: customer.doc,
                    phone: customer.phone,
                },
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }
}

module.exports = CustomersControllerAPI;
