const mongoose = require('mongoose');

const requestSchema = mongoose.Schema({
    cod: {
        type: Number,
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
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const Request = mongoose.model('request', requestSchema, 'requests');

module.exports = Request;
