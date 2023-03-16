const Product = require('../../models/Product');

class ProductServiceAPI {
    static async registerProduct(productData) {
        try {
            return await Product.create(productData);
        } catch (err) {
            return err;
        }
    }

    static async findAllProducts() {
        try {
            return await Product.find({});
        } catch (err) {
            return err;
        }
    }

    static async findProductsByType(type) {
        try {
            return await Product.find({ type });
        } catch (err) {
            return err;
        }
    }

    static async findProductByName(name) {
        try {
            return await Product.findOne({ name });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered product with this ID.";
            }
            return err;
        }
    }

    static async findProductById(id) {
        try {
            return await Product.findOne({ _id: id });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered product with this ID.";
            }
            return err;
        }
    }

    static async updateProductById(id, newData) {
        try {
            return await Product.updateOne({ _id: id }, { $set: newData });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered product with this ID.";
            }
            return err;
        }
    }

    static async deleteProductById(id) {
        try {
            return await Product.deleteOne({ _id: id });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered product with this ID.";
            }
            return err;
        }
    }
}

module.exports = ProductServiceAPI;
