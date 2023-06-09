const mongoose = require('mongoose');

const customerSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        doc: {
            type: String,
            unique: true,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'A'
        },
        email: {
            type: String,
            unique: true,
            lowercase: true
        },
        phone: {
            type: String
        }
    },
    { versionKey: false, timestamps: true }
);

const Customer = mongoose.model('customer', customerSchema, 'customers');

module.exports = Customer;
