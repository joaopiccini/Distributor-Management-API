const ProductServiceAPI = require('../services/ProductService');
require('dotenv/config');

class ProductsControllerAPI {
    static async registerProduct(req, res) {
        try {
            const response = await ProductServiceAPI.registerProduct(req.body);
            const responseIsError = typeof response === 'string';
            if (responseIsError) {
                return res.json(response);
            }
            return res.json({
                created: true,
                message: 'Product created in database',
                product: response,
            });
        } catch (err) {
            return res.json(err);
        }
    }

    static async findAllProducts(req, res) {
        try {
            const response = await ProductServiceAPI.findAllProducts();
            return res.json(response);
        } catch (err) {
            return res.json(err);
        }
    }

    static async findProductsByType(req, res) {
        try {
            const response = await ProductServiceAPI.findProductsByType(
                req.params.type
            );
            return res.json(response);
        } catch (err) {
            return res.json(err);
        }
    }

    static async findProductById(req, res) {
        try {
            const response = await ProductServiceAPI.findProductById(
                req.params.id
            );
            return res.json(response);
        } catch (err) {
            return res.json(err);
        }
    }

    static async updateProductById(req, res) {
        try {
            const response = await ProductServiceAPI.updateProductById(
                req.params.id,
                req.body
            );
            const responseIsError = typeof response === 'string';
            if (responseIsError) {
                return res.json(response);
            }
            return res.json({
                updated: true,
                message: 'Product updated in database',
            });
        } catch (err) {
            return res.json(err);
        }
    }

    static async deleteProductById(req, res) {
        try {
            const response = await ProductServiceAPI.deleteProductById(
                req.params.id
            );
            const responseIsError = typeof response === 'string';
            if (responseIsError) {
                return res.json(response);
            }
            return res.json({
                deleted: true,
                message: 'Product deleted of database',
                product: response,
            });
        } catch (err) {
            return res.json(err);
        }
    }
}

module.exports = ProductsControllerAPI;
