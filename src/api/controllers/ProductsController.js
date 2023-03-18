const ProductService = require('../services/ProductService');
require('dotenv/config');

class ProductsController {
    static async registerProduct(req, res) {
        try {
            const productData = req.body;
            const { name } = req.body;
            const productFound = await ProductService.findProductByName(name);
            if (productFound) {
                return res.status(200).json('The product is already registered.');
            }
            await ProductService.registerProduct(productData);
            return res.status(201).json({ message: 'Product registered in database.' });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findAllProducts(req, res) {
        try {
            const products = await ProductService.findAllProducts();
            const productNotFound = products.length === 0;
            if (productNotFound) {
                return res.status(200).json("There aren't registered products.");
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
            const products = await ProductService.findProductsByType(type);
            const productNotFound = products.length === 0;
            if (productNotFound) {
                return res.status(200).json("There aren't registered products with this type.");
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
            const productFound = await ProductService.findProductById(id);
            if (!productFound) {
                return res.status(200).json("There isn't registered product with this ID.");
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
            const productFound = await ProductService.findProductById(id);
            if (!productFound) {
                return res.status(200).json("There isn't registered product with this ID.");
            }
            await ProductService.updateProductById(id, product);
            return res.status(200).json({ message: 'Product updated in database.' });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async deleteProductById(req, res) {
        try {
            const { id } = req.params;
            const productFound = await ProductService.findProductById(id);
            if (!productFound) {
                return res.status(200).json("There isn't registered product with this ID.");
            }
            await ProductService.deleteProductById(id);
            return res.status(200).json({ message: 'Product deleted of database.' });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }
}

module.exports = ProductsController;
