const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UsersService = require('../services/UsersService');
const Authentication = require('../auth/Authentication');
require('dotenv/config');

class UsersController {
    static async createUser(req, res) {
        try {
            const userData = req.body;
            const dataLimit = Object.keys(userData).length === 3;
            const userDataIsValid = userData.name && userData.email && userData.password && dataLimit;
            if (userDataIsValid) {
                const userExists = await UsersService.findUserByEmail(userData.email);
                if (userExists) {
                    return res.status(200).json('E-mail already registered.');
                }
                userData.password = await bcrypt.hash(userData.password, 10);
                const user = await UsersService.createUser(userData);
                return res.status(200).json({ message: 'User has been created' });
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
                return res.status(200).json("There aren't registered user.");
            }
            return res.status(200).json({ users });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async findUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UsersService.findUserById(id);
            if (!user) {
                return res.status(200).json("There isn't registered user with this ID.");
            }
            return res.status(200).json({ user });
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }

    static async inactivateUser(req, res) {
        try {
            const { email } = req.params;
            const userExists = await UsersService.findUserByEmail(email);
            if (userExists) {
                if (userExists.status === 'A') {
                    await UsersService.updateUserByEmail(email, { status: 'I' });
                    return res.status(200).json({ message: 'Successfully inactive user' });
                }
                return res.status(400).json('This User is already inactive.');
            }
            return res.status(400).json('User data is incorrect or not valid.');
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
                    await UsersService.updateUserByEmail(email, { status: 'A' });
                    return res.status(200).json({ message: 'Successfully active user' });
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
            const dataLimit = Object.keys(userData).length === 2;
            const userDataIsValid = userData.email && userData.password && dataLimit;
            if (userDataIsValid) {
                const user = await UsersService.findUserByEmail(userData.email);
                if (user && user.status === 'A') {
                    const userAutenticate = await Authentication.autenticateUser(userData, user, res);
                    if (userAutenticate) {
                        console.log(`User ${user.name} has connected`);
                        return res.status(200).json({ message: `User ${user.name} has been connected` });
                    }
                    return res.status(400).json('User data is incorrect or not valid.');
                }
                return res.status(400).json('User data is incorrect or not valid.');
            }
            return res.status(400).json('User data is incorrect or not valid.');
        } catch (err) {
            console.log(err);
            return res.status(500).json('Internal Server Error.');
        }
    }
}

module.exports = UsersController;
