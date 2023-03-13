const UsersService = require('../services/UsersService');
require('dotenv/config');

class UsersController {
    static async createUser(req, res) {
        try {
            const response = await UsersService.createUser(req.body);
            return res.json(response);
        } catch (err) {
            return res.json(err);
        }
    }

    static async loginUser(req, res) {
        try {
            const response = await UsersService.loginUser(req.body);
            return res.json(response);
        } catch (err) {
            return res.json(err);
        }
    }
}

module.exports = UsersController;
