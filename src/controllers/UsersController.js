const UsersService = require('../services/UsersService')
const jwt = require('jsonwebtoken');
require('dotenv/config');

class UsersController{

    static async createUser(req, res) {
        try {
            const response = await UsersService.createUser(req.body);
            res.json(response);
        } catch (err) {
            res.json(err)
        }

    }

    static async loginUser(req, res) {
        try {
            const response = await UsersService.loginUser(req.body);
            res.json(response);
        } catch (err) {
            res.json(err)
        }

    }

    static async createToken(req, res) {
        try {
            const response = await UsersService.createToken(req.body);
            const idUser = JSON.stringify(response._id).replace('new ObjectId("")', '')
            const token = jwt.sign({idUser: idUser}, process.env.SECRET);
            res.json({auth: true, token: token});
        } catch (err) {
            res.json(err)
        }

    }

}

module.exports = UsersController