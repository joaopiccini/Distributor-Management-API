const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select: false,
            min: 8,
            max: 30
        },
        status: {
            type: String,
            required: true,
            default: 'A'
        }
    },
    { versionKey: false, timestamps: true }
);

const User = mongoose.model('user', userSchema, 'users');

module.exports = User;
