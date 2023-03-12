const mongoose = require('mongoose')

const requestSchema = mongoose.Schema({
    description: {
        type: String,
        require: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }],
    price: {
        type: Number,
        required: true
    },
    author: {
        type: String,
        required: true,
        default:"System"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Request = mongoose.model('request', requestSchema, 'requests')

module.exports = Request