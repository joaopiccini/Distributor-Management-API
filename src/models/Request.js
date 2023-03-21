const mongoose = require('mongoose');

const requestSchema = mongoose.Schema(
    {
        cod: {
            type: String,
            unique: true,
            require: true
        },
        description: {
            type: String,
            require: true
        },
        products: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'product',
                required: true
            }
        ],
        quantity: [
            {
                type: Number,
                required: true
            }
        ],
        price: {
            type: Number,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
            default: 'System'
        },
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'customer',
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'released'
        }
    },
    { versionKey: false, timestamps: true }
);

const Request = mongoose.model('request', requestSchema, 'requests');

module.exports = Request;
