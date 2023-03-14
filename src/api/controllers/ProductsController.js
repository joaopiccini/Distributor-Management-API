const jwt = require('jsonwebtoken');
const ProductServiceAPI = require('../services/ProductService');
require('dotenv/config');

class ProductsControllerAPI {
    static async registerProduct(req, res) {
        try {
            const response = await ProductServiceAPI.registerProduct(req.body);
            if (typeof response === 'object' && response !== null) {
                return res.json({
                    message: 'Product created in database',
                    product: {
                        name: response.name,
                        type: response.type,
                        price: response.price,
                        quantity: response.quantity,
                        author: response.author,
                    },
                });
            }
            return res.json(response);
        } catch (err) {
            return res.json(err);
        }
    }

    static async findAllProducts(req, res) {
        try {
            const response = await ProductServiceAPI.findAllProducts();
            return res.json(response);
        } catch (err) {
            return err;
        }
    }

    static async findProductsByType(req, res) {
        try {
            const response = await ProductServiceAPI.findProductsByType(
                req.params.type
            );
            return res.json(response);
        } catch (err) {
            return err;
        }
    }

    static async findProductById(req, res) {
        try {
            const response = await ProductServiceAPI.findProductById(
                req.params.id
            );
            return res.json(response);
        } catch (err) {
            return err;
        }
    }

    static async updateProductById(req, res) {
        try {
            const response = await ProductServiceAPI.updateProductById(
                req.params.id,
                req.body
            );
            if (typeof response === 'object' && response !== null) {
                return res.json({
                    updated: true,
                    message: 'Product updated in database',
                    product: {
                        name: response.name,
                        type: response.type,
                        price: response.price,
                        quantity: response.quantity,
                        author: response.author,
                    },
                });
            }
            return res.json(response);
        } catch (err) {
            return err;
        }
    }

    static async deleteProductById() {}
}

module.exports = ProductsControllerAPI;
