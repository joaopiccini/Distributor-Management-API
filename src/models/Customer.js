const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    doc: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Customer = mongoose.model('customer', customerSchema, 'customers');

module.exports = Customer;
