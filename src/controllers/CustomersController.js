const CustomersService = require('../services/CustomersService');
require('dotenv/config');

class CustomersController {
    static async createCustomer(req, res) {
        try {
            const customerData = req.body;
            const { doc } = req.body;
            const customerExists = await CustomersService.findCustomerByDoc(
                doc
            );
            if (customerExists) {
                return 'The customer is already registered';
            }
            await CustomersService.createCustomer(customerData);
            return res.status(201).json({
                message: 'Customer created in database',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findAllCustomer(req, res) {
        try {
            const customers = await CustomersService.findAllCustomers();
            const customersQuantity = customers.length;
            if (customersQuantity === 0) {
                return "There aren't registered customers.";
            }
            return res.status(200).json({ customers });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findCustomerByDoc(req, res) {
        try {
            const { doc } = req.params;
            const customer = await CustomersService.findCustomerByDoc(doc);
            if (!customer) {
                return "There isn't registered customer with this document.";
            }
            return res.status(200).json({ customer });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findCustomerById(req, res) {
        try {
            const { id } = req.params;
            const customer = await CustomersService.findCustomerById(id);
            if (!customer) {
                return "There isn't registered customer with this ID.";
            }
            return res.status(200).json({ customer });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async updateCustomer() {}

    static async inativeCustomer() {}

    static async findAllCustomerAPI(req, res) {
        try {
            const customers = await CustomersService.findAllCustomers();
            const customersQuantity = customers.length;
            if (customersQuantity === 0) {
                return "There aren't registered customers.";
            }
            const customersToSent = [];
            for (let i = 0; i < customersQuantity; i++) {
                const customer = {
                    id: customers[i]._id,
                    name: customers[i].name,
                    document: customers[i].doc,
                    phone: customers[i].phone,
                };
                customersToSent.push(customer);
            }
            return res.status(200).json({ customers: customersToSent });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findCustomerByDocAPI(req, res) {
        try {
            const { doc } = req.params;
            const customer = await CustomersService.findCustomerByDoc(doc);
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

    static async findCustomerByIdAPI(req, res) {
        try {
            const { id } = req.params;
            const customer = await CustomersService.findCustomerById(id);
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

module.exports = CustomersController;
