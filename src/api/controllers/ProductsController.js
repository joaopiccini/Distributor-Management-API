const ProductsService = require('../services/ProductsService');
require('dotenv/config');

class ProductsController {
    static async registerProduct(req, res) {
        try {
            const productData = req.body;
            const dataLimit = Object.keys(productData).length === 4;
            const productDataIsValid =
                productData.name && productData.type && productData.price && productData.quantity && dataLimit;
            const productFound = await ProductsService.findProductByName(productData.name);
            if (productDataIsValid) {
                if (!productFound) {
                    const priceAndQuantityIsValid = productData.price > 0 && productData.quantity >= 0;
                    if (priceAndQuantityIsValid) {
                        await ProductsService.registerProduct(productData);
                        return res.status(201).json({ message: 'Product registered in database.' });
                    }
                    return res.status(400).json('Product price or quantity is incorrect or not valid.');
                }
                return res.status(200).json('The product is already registered.');
            }
            return res.status(400).json('Product data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findAllProducts(req, res) {
        try {
            const products = await ProductsService.findAllProducts();
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
            const products = await ProductsService.findProductsByType(type);
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
            const productFound = await ProductsService.findProductById(id);
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
            const newProductData = req.body;
            const productFound = await ProductsService.findProductById(id);
            if (!productFound) {
                return res.status(200).json("There isn't registered product with this ID.");
            }
            await ProductsService.updateProductById(id, newProductData);
            return res.status(200).json({ message: 'Product updated in database.' });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async deleteProductById(req, res) {
        try {
            const { id } = req.params;
            const productFound = await ProductsService.findProductById(id);
            if (!productFound) {
                return res.status(200).json("There isn't registered product with this ID.");
            }
            await ProductsService.deleteProductById(id);
            return res.status(200).json({ message: 'Product deleted of database.' });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }
}

module.exports = ProductsController;
