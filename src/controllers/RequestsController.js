const shortId = require('shortid');
const RequestsService = require('../services/RequestsService');
const UsersService = require('../services/UsersService');
const CostumersService = require('../services/CustomersService');
const ProductsService = require('../services/ProductsService');
require('dotenv/config');

class RequestsController {
    static async doRequest(req, res) {
        try {
            const requestData = req.body;
            const dataLimit = Object.keys(requestData).length === 4;
            const requestDataIsValid =
                requestData.description &&
                requestData.products &&
                requestData.customer &&
                requestData.quantity &&
                dataLimit;
            if (requestDataIsValid) {
                const customerExists = await CostumersService.findCustomerById(requestData.customer);
                if (customerExists && customerExists.status === 'A') {
                    const productsExists = await ProductsService.findManyProductsByIds(requestData.products);
                    if (productsExists) {
                        const productsQuantity = requestData.products.length;
                        const quantityOfQuantitys = requestData.quantity.length;
                        if (productsQuantity === quantityOfQuantitys) {
                            let haveEnoughProducts = true;
                            for (let i = 0; i < productsQuantity; i++) {
                                const avaibleProducts = productsExists[i].quantity;
                                const requestProducts = requestData.quantity[i];
                                const haveProduct = avaibleProducts >= requestProducts;
                                if (!haveProduct) {
                                    haveEnoughProducts = false;
                                    break;
                                }
                            }
                            if (haveEnoughProducts) {
                                let totalValueOfProducts = 0;
                                for (let i = 0; i < productsQuantity; i++) {
                                    totalValueOfProducts += productsExists[i].price * requestData.quantity[i];
                                }
                                const regex = /"/g;
                                const idUser = req.user.replace(regex, '');
                                requestData.price = totalValueOfProducts;
                                requestData.cod = shortId.generate();
                                requestData.author = await UsersService.findUserById(idUser);
                                const request = await RequestsService.doRequest(requestData);
                                return res.status(201).json({ message: 'Request registered in database.', request });
                            }
                            return res.status(200).json("Don't have enough products.");
                        }
                        return res.status(400).json('Quantity of products does not match of the products.');
                    }
                    return res.status(400).json('Products data is incorrect or not valid.');
                }
                return res.status(400).json('Customer data is incorrect or not valid.');
            }
            return res.status(400).json('Request data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findAllRequests(req, res) {
        try {
            const requests = await RequestsService.findAllRequests();
            const requestsNotFound = requests.length === 0;
            if (requestsNotFound) {
                return res.status(200).json("There aren't registered requests.");
            }
            return res.status(200).json({ requests });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findRequestByAuthor(req, res) {
        try {
            const { author } = req.params;
            const requests = await RequestsService.findRequestByAuthor(author);
            const requestsNotFound = requests.length === 0;
            if (requestsNotFound) {
                return res.status(200).json("There aren't registered requests with this author.");
            }
            return res.status(200).json({ requests });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findRequestByCod(req, res) {
        try {
            const { cod } = req.params;
            const request = await RequestsService.findRequestByCod(cod);
            if (!request) {
                return res.status(200).json("There isn't registered request with this code.");
            }
            return res.status(200).json({ request });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findRequestById(req, res) {
        try {
            const { id } = req.params;
            const request = await RequestsService.findRequestById(id);
            if (!request) {
                return res.status(200).json("There isn't registered request with this ID.");
            }
            return res.status(200).json({ request });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async updateRequestById(req, res) {
        try {
            const { id } = req.params;
            const newRequestData = req.body;
            const requestFound = await RequestsService.findRequestById(id);
            if (!requestFound) {
                return res.status(200).json("There isn't registered request with this ID.");
            }
            const update = await RequestsService.updateRequestById(id, newRequestData);
            return res.status(200).json({ message: 'Request updated in database.', update });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async completeRequestById(req, res) {
        try {
            const { id } = req.params;
            const requestExists = await RequestsService.findRequestById(id);
            if (requestExists) {
                if (requestExists.status === 'released') {
                    await RequestsService.updateRequestById(id, { status: 'completed' });
                    return res.status(200).json({ message: 'The request has been completed' });
                }
                return res.status(400).json('This request status is no released.');
            }
            return res.status(400).json('Request data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async cancelRequestById(req, res) {
        try {
            const { id } = req.params;
            const requestExists = await RequestsService.findRequestById(id);
            if (requestExists) {
                if (requestExists.status === 'released') {
                    await RequestsService.updateRequestById(id, { status: 'canceled' });
                    return res.status(200).json({ message: 'The request has been canceled' });
                }
                return res.status(400).json('This request status is no released.');
            }
            return res.status(400).json('Request data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async deleteRequestById(req, res) {
        try {
            const { id } = req.params;
            const requestFound = await RequestsService.findRequestById(id);
            if (!requestFound) {
                return res.status(200).json("There isn't registered request with this ID.");
            }
            await RequestsService.deleteRequestById(id);
            return res.status(200).json({ message: 'Product deleted of database.' });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }
}

module.exports = RequestsController;
