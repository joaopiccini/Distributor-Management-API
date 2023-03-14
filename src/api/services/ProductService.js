const Product = require('../../models/Product');

class ProductServiceAPI {
    static async registerProduct(body) {
        try {
            const productExist = await Product.findOne({ name: body.name });
            if (productExist) {
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
            if (products.length == 0) {
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
            if (products.length == 0) {
                return "There aren't registered products with this type.";
            }
            return products;
        } catch (err) {
            return err;
        }
    }

    static async findProductById(id) {
        try {
            const product = await Product.find({ _id: id });
            if (product.length == 0) {
                return "There aren't registered products with this ID.";
            }
            return product;
        } catch (err) {
            return err;
        }
    }

    static async updateProductById(id, body) {
        try {
            await Product.updateOne({ _id: id }, { $set: body });
            const productUpdated = await Product.find({ _id: id });
            if (productUpdated.length == 0) {
                return "There aren't registered products with this ID.";
            }
            return productUpdated;
        } catch (err) {
            return err;
        }
    }

    static async deleteProductById() {}
}

module.exports = ProductServiceAPI;
