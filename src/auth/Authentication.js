const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv/config');

class Authentication {
    static async validateJWT(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const tokenVerification = await jwt.verify(token, process.env.JWT_SECRET);
            if (!tokenVerification) {
                return res.status(401).json('Token informed in the requst is not valid.');
            }
            req.user = tokenVerification.userId;
            return next();
        } catch {
            return res.status(401).json('Token informed in the requst is not valid.');
        }
    }

    static async AutenticateUser(requestUser, DatabaseUser, res) {
        try {
            const emailIsCorrect = requestUser.email === DatabaseUser.email;
            const passwordIsCorrect = await bcrypt.compare(requestUser.password, DatabaseUser.password);
            if (emailIsCorrect && passwordIsCorrect) {
                return true;
            }
            return false;
        } catch {
            return res.status(401).json('User data is incorrect or not valid.');
        }
    }
}

module.exports = Authentication;
