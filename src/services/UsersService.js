const bcrypt = require('bcryptjs');
const User = require('../models/User');

class UsersService {
    static async createUser(body) {
        try {
            const userExists = await User.findOne({ email: body.email });
            if (userExists) {
                return 'E-mail already registered.';
            }
            body.password = await bcrypt.hash(body.password, 10);
            const newUser = await User.create(body);
            return newUser;
        } catch (err) {
            return err;
        }
    }

    static async loginUser(body) {
        try {
            const userExists = await User.findOne({ email: body.email });
            if (userExists) {
                const emailIsCorrect = userExists.email === body.email;
                const passwordIsCorrect = await bcrypt.compare(
                    body.password,
                    user.password
                );
                if (emailIsCorrect && passwordIsCorrect) {
                    return userExists;
                }
            }
            return 'User data is incorrect or not valid.';
        } catch (err) {
            return err;
        }
    }
}

module.exports = UsersService;
