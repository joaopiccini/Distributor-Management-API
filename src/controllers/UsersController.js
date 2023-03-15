const bcrypt = require('bcryptjs');
const UsersService = require('../services/UsersService');
const Authentication = require('../auth/Authentication');
require('dotenv/config');

class UsersController {
    static async createUser(req, res) {
        try {
            const userData = req.body;
            const { email, password } = req.body;
            const userExists = await UsersService.findUserByEmail(email);
            if (userExists) return 'E-mail already registered.';
            userData.password = await bcrypt.hash(password, 10);
            const user = await UsersService.createUser(userData);
            return res.json(user);
        } catch (err) {
            return res.json(err);
        }
    }

    static async loginUser(req, res) {
        try {
            const userData = req.body;
            const { email } = req.body;
            const userExists = await UsersService.findUserByEmail(email);
            if (userExists) {
                const userAutenticate = await Authentication.AutenticateUser(
                    userData,
                    userExists
                );
                if (userAutenticate) return userExists;
                return 'User data is incorrect or not valid.';
            }
            return 'User data is incorrect or not valid.';
        } catch (err) {
            return res.json(err);
        }
    }
}

module.exports = UsersController;
