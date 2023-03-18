const User = require('../models/User');

class UsersService {
    static async createUser(userData) {
        try {
            return await User.create(userData);
        } catch (err) {
            return err;
        }
    }

    static async findAllUsers() {
        try {
            return await User.find({});
        } catch (err) {
            return err;
        }
    }

    static async findUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (err) {
            if (err.name === 'CastError') {
                return "There isn't registered product with this Email.";
            }
            return err;
        }
    }

    static async updateUserByEmail(email, newData) {
        try {
            return await User.updateOne({ email }, { $set: newData });
        } catch (err) {
            return err;
        }
    }
}

module.exports = UsersService;
