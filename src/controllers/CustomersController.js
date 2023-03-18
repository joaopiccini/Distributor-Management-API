const CustomersService = require('../services/CustomersService');
require('dotenv/config');

class CustomersController {
    static async createCustomer(req, res) {
        try {
            const customerData = req.body;
            const customerDataIsValid = customerData.name && customerData.doc;
            const customerExists = await CustomersService.findCustomerByDoc(customerData.doc);
            if (!customerExists) {
                if (customerDataIsValid) {
                    await CustomersService.createCustomer(customerData);
                    return res.status(201).json({ message: 'Customer created in database' });
                }
                return res.status(400).json('Customer data is incorrect or not valid.');
            }
            return res.status(200).json('The customer is already registered');
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
                return res.status(200).json("There aren't registered customers.");
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
                return res.status(200).json("There isn't registered customer with this document.");
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
                return res.status(200).json("There isn't registered customer with this ID.");
            }
            return res.status(200).json({ customer });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async updateCustomer(req, res) {
        try {
            const { doc } = req.params;
            1;
            const newCustomerData = req.body;
            const customerExists = await CustomersService.findCustomerByDoc(doc);
            if (customerExists) {
                await CustomersService.updateCustomerByDoc(doc, newCustomerData);
                return res.status(200).json({ message: 'Successfully updated customer' });
            }
            return res.status(400).json('Customer data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async inativeCustomer(req, res) {
        try {
            const { doc } = req.params;
            const customerExists = await CustomersService.findCustomerByDoc(doc);
            if (customerExists) {
                if (customerExists.status === 'A') {
                    await CustomersService.updateCustomerByDoc(doc, { status: 'I' });
                    return res.status(200).json({ message: 'Successfully inactive customer' });
                }
                return res.status(200).json('This customer is already inactive.');
            }
            return res.status(400).json('Customer data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async activateCustomer(req, res) {
        try {
            const { doc } = req.params;
            const customerExists = await CustomersService.findCustomerByDoc(doc);
            if (customerExists) {
                if (customerExists.status === 'I') {
                    await CustomersService.updateCustomerByDoc(doc, { status: 'A' });
                    return res.status(200).json({ message: 'Successfully active customer' });
                }
                return res.status(200).json('This customer is already active.');
            }
            return res.status(400).json('Customer data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findAllCustomerAPI(req, res) {
        try {
            const customers = await CustomersService.findAllCustomers();
            const customersQuantity = customers.length;
            if (customersQuantity === 0) {
                return res.status(200).json("There isn't registered customer.");
            }
            const customersToSent = [];
            for (let i = 0; i < customersQuantity; i++) {
                const customer = {
                    id: customers[i]._id,
                    name: customers[i].name,
                    document: customers[i].doc,
                    phone: customers[i].phone
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
                return res.status(200).json("There isn't registered customer with this document.");
            }
            return res.status(200).json({
                customer: {
                    id: customer._id,
                    name: customer.name,
                    document: customer.doc,
                    phone: customer.phone
                }
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
                return res.status(200).json("There isn't registered customer with this ID.");
            }
            return res.status(200).json({
                customer: {
                    id: customer._id,
                    name: customer.name,
                    document: customer.doc,
                    phone: customer.phone
                }
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }
}

module.exports = CustomersController;
