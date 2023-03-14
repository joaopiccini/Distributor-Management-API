const Product = require('../../models/Product');

class ProductServiceAPI {
    static async registerProduct(body) {
        try {
            const productExists = await Product.findOne({ name: body.name });
            if (productExists) {
                return 'The product is already registered';
            }
            const product = await Product.create(body);
            return product;
        } catch (err) {
            return err;
        }
    }

    static async findAllProducts() {
        try {
            const products = await Product.find({});
            const productNotFound = products.length === 0;
            if (productNotFound) {
                return "There aren't registered products.";
            }
            return products;
        } catch (err) {
            return err;
        }
    }

    static async findProductsByType(type) {
        try {
            const products = await Product.find({ type });
            const productNotFound = products.length === 0;
            if (productNotFound) {
                return "There aren't registered products with this type.";
            }
            return products;
        } catch (err) {
            return err;
        }
    }

    static async findProductById(id) {
        try {
            const productExists = await Product.findOne({ _id: id });
            if (!productExists) {
                return "There isn't registered product with this ID.";
            }
            return productExists;
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered product with this ID.";
            }
            return err;
        }
    }

    static async updateProductById(id, body) {
        try {
            const productExists = await Product.findOne({ _id: id });
            if (!productExists) {
                return "There isn't registered product with this ID.";
            }
            await Product.updateOne({ _id: id }, { $set: body });
            return productExists;
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered product with this ID.";
            }
            return err;
        }
    }

    static async deleteProductById(id) {
        try {
            const productExist = await Product.findOneAndDelete({ _id: id });
            if (!productExist) {
                return "There isn't registered product with this ID.";
            }
            return productExist;
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered product with this ID.";
            }
            return err;
        }
    }
}

module.exports = ProductServiceAPI;
