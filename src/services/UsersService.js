const User = require('../models/User');

class UsersService {
    static async createUser(userData) {
        try {
            return await User.create(userData);
        } catch (err) {
            return err;
        }
    }

    static async findUserByEmail(email) {
        try {
            return await User.findOne({ email });
        } catch (err) {
            return err;
        }
    }
}

module.exports = UsersService;
