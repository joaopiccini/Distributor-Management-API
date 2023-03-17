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
            const userDataIsValid =
                userData.name && userData.email && userData.password;
            if (userDataIsValid) {
                const userExists = await UsersService.findUserByEmail(email);
                if (userExists) {
                    return res.status(200).json('E-mail already registered.');
                }
                userData.password = await bcrypt.hash(password, 10);
                const user = await UsersService.createUser(userData);
                return res.status(200).json({
                    message: 'User created',
                    user: {
                        name: user.name,
                        email: user.email,
                        status: user.status,
                    },
                });
            }
            return res.status(400).json('User data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findAllUsers(req, res) {
        try {
            const users = await UsersService.findAllUsers();
            const usersNotFound = users.length === 0;
            if (usersNotFound) {
                return "There aren't registered products.";
            }
            return res.status(200).json({ users });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async inactivateUser(req, res) {
        try {
            const { email } = req.params;
            const userExists = await UsersService.findUserByEmail(email);
            if (userExists && userExists.status === 'A') {
                await UsersService.updateUserByEmail(email, { status: 'I' });
                return res
                    .status(200)
                    .json({ message: 'Successfully inactive user' });
            }
            return res.status(400).json('This User is already inactive.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async activateUser(req, res) {
        try {
            const { email } = req.params;
            const userExists = await UsersService.findUserByEmail(email);
            if (userExists) {
                if (userExists.status === 'I') {
                    await UsersService.updateUserByEmail(email, {
                        status: 'A',
                    });
                    return res
                        .status(200)
                        .json({ message: 'Successfully active user' });
                }
                return res.status(200).json('This User is already active.');
            }
            return res.status(400).json('User data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async loginUser(req, res) {
        try {
            const userData = req.body;
            const { email } = req.body;
            const userDataIsValid = userData.email && userData.password;
            if (userDataIsValid) {
                const userExists = await UsersService.findUserByEmail(email);
                if (userExists && userExists.status === 'A') {
                    const userAutenticate =
                        await Authentication.AutenticateUser(
                            userData,
                            userExists,
                            res
                        );
                    if (userAutenticate) {
                        return res.status(200).json(userExists);
                    }
                    return res
                        .status(400)
                        .json('User data is incorrect or not valid.');
                }
                return res
                    .status(400)
                    .json('User data is incorrect or not valid.');
            }
            return res.status(400).json('User data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async createToken(req, res) {
        try {
            const userData = req.body;
            const { email } = req.body;
            const userDataIsValid = userData.email && userData.password;
            if (userDataIsValid) {
                const userExists = await UsersService.findUserByEmail(email);
                if (userExists && userExists.status === 'A') {
                    const userAutenticate =
                        await Authentication.AutenticateUser(
                            userData,
                            userExists
                        );
                    if (userAutenticate) {
                        const expiresIn = '365d';
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
                    return res
                        .status(400)
                        .json('User data is incorrect or not valid.');
                }
                return res
                    .status(400)
                    .json('User data is incorrect or not valid.');
            }
            return res.status(400).json('User data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }
}

module.exports = UsersController;
