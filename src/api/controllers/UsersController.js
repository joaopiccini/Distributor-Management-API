const jwt = require('jsonwebtoken');
const UsersServiceAPI = require('../services/UsersService');
require('dotenv/config');

class UsersControllerAPI {
    static async createUserAPI(req, res) {
        try {
            const response = await UsersServiceAPI.createUserAPI(req.body);
            const responseIsObject =
                typeof response === 'object' && response != null;
            if (responseIsObject) {
                const idUser = JSON.stringify(response._id).replace(
                    'new ObjectId("")',
                    ''
                );
                const token = jwt.sign({ idUser }, process.env.SECRET, {
                    expiresIn: '365d',
                });
                return res.json({
                    message: 'User created in database',
                    user: { name: response.name, email: response.email },
                    auth: true,
                    token,
                    expiresIn: '1h',
                });
            }
            return res.json(response);
        } catch (err) {
            return res.json(err);
        }
    }

    static async createToken(req, res) {
        try {
            const response = await UsersServiceAPI.createToken(req.body);
            const responseIsObject =
                typeof response === 'object' && response != null;
            if (responseIsObject) {
                const idUser = JSON.stringify(response._id).replace(
                    'new ObjectId("")',
                    ''
                );
                const token = jwt.sign({ idUser }, process.env.SECRET, {
                    expiresIn: '1h',
                });
                return res.json({
                    message: 'Token created',
                    auth: true,
                    token,
                    expiresIn: '1h',
                });
            }
            return res.json(response);
        } catch (err) {
            return res.json(err);
        }
    }
}

module.exports = UsersControllerAPI;
