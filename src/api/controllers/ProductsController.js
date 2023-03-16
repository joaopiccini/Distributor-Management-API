const ProductServiceAPI = require('../services/ProductService');
require('dotenv/config');

class ProductsControllerAPI {
    static async registerProduct(req, res) {
        try {
            const productData = req.body;
            const { name } = req.body;
            const productFound = await ProductServiceAPI.findProductByName(
                name
            );
            if (productFound) {
                return 'The product is already registered.';
            }
            await ProductServiceAPI.registerProduct(productData);
            return res.status(201).json({
                message: 'Product registered in database.',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findAllProducts(req, res) {
        try {
            const products = await ProductServiceAPI.findAllProducts();
            const productNotFound = products.length === 0;
            if (productNotFound) {
                return "There aren't registered products.";
            }
            return res.status(200).json(products);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findProductsByType(req, res) {
        try {
            const { type } = req.params;
            const products = await ProductServiceAPI.findProductsByType(type);
            const productNotFound = products.length === 0;
            if (productNotFound) {
                return "There aren't registered products with this type.";
            }
            return res.status(200).json(products);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findProductById(req, res) {
        try {
            const { id } = req.params;
            const productFound = await ProductServiceAPI.findProductById(id);
            if (!productFound) {
                return "There isn't registered product with this ID.";
            }
            return res.status(200).json(productFound);
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async updateProductById(req, res) {
        try {
            const { id } = req.params;
            const product = req.body;
            const productFound = await ProductServiceAPI.findProductById(id);
            if (!productFound) {
                return "There isn't registered product with this ID.";
            }
            await ProductServiceAPI.updateProductById(id, product);
            return res.status(200).json({
                message: 'Product updated in database.',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async deleteProductById(req, res) {
        try {
            const { id } = req.params;
            const productFound = await ProductServiceAPI.findProductById(id);
            if (!productFound) {
                return "There isn't registered product with this ID.";
            }
            await ProductServiceAPI.deleteProductById(id);
            return res.status(200).json({
                message: 'Product deleted of database.',
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }
}

module.exports = ProductsControllerAPI;
