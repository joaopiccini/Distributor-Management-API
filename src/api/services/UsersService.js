const bcrypt = require('bcryptjs');
const User = require('../../models/User');

class UsersServiceAPI {
    static async createUserAPI(body) {
        try {
            const user = await User.findOne({ email: body.email });
            if (user) {
                return 'E-mail already registered.';
            }
            body.password = await bcrypt.hash(body.password, 10);
            const newUser = await User.create(body);
            return newUser;
        } catch (err) {
            return err;
        }
    }

    static async createToken(body) {
        try {
            const user = await User.findOne({ email: body.email });
            if (user) {
                const emailIsCorrect = user.email === body.email;
                const passwordIsCorrect = await bcrypt.compare(
                    body.password,
                    user.password
                );
                if (emailIsCorrect && passwordIsCorrect) {
                    return user;
                }
            }
            return 'User data is incorrect or not valid.';
        } catch (err) {
            return err;
        }
    }
}

module.exports = UsersServiceAPI;
