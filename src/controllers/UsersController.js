const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsersService = require('../services/UsersService');
const Authentication = require('../auth/Authentication');
require('dotenv/config');

class UsersController {
    static async createUser(req, res) {
        try {
            const userData = req.body;
            const { email, password } = req.body;
            const userExists = await UsersService.findUserByEmail(email);
            // if (userExists) return 'E-mail already registered.';
            console.log(userData);
            userData.password = await bcrypt.hash(password, 10);
            const user = await UsersService.createUser(userData);
            return res.json({ message: 'User created' });
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

    static async createToken(req, res) {
        try {
            const userData = req.body;
            const { email } = req.body;
            const userExists = await UsersService.findUserByEmail(email);
            if (userExists) {
                const userAutenticate = await Authentication.AutenticateUser(
                    userData,
                    userExists
                );
                if (userAutenticate) {
                    const expiresIn = '1h';
                    const regex = 'new ObjectId("")';
                    const userId = JSON.stringify(userExists._id).replace(
                        regex,
                        ''
                    );
                    const token = jwt.sign({ userId }, process.env.SECRET, {
                        expiresIn,
                    });
                    return res.json({
                        message: 'Token created',
                        token,
                        expiresIn,
                    });
                }
                return 'User data is incorrect or not valid.';
            }
            return 'User data is incorrect or not valid.';
        } catch (err) {
            return res.json(err);
        }
    }
}

module.exports = UsersController;
