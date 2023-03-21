const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            require: true
        },
        type: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        provider: {
            type: String,
            required: true,
            default: 'System'
        }
    },
    { versionKey: false, timestamps: true }
);

const Product = mongoose.model('product', productSchema, 'products');

module.exports = Product;
