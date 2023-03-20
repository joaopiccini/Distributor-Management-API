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

    static async autenticateUser(requestUser, databaseUser, res) {
        try {
            const emailIsCorrect = requestUser.email === databaseUser.email;
            const passwordIsCorrect = await bcrypt.compare(requestUser.password, databaseUser.password);
            if (emailIsCorrect && passwordIsCorrect) {
                return true;
            }
            return false;
        } catch {
            return res.status(401).json('User data is incorrect or not valid.');
        }
    }

    static async testValidateJWT(token) {
        try {
            const tokenWithoutBearer = token.split(' ')[1];
            const tokenVerification = await jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
            if (!tokenVerification) {
                return 'Token informed in the requst is not valid.';
            }
            const tokenContent = tokenVerification.userId;
            return tokenContent;
        } catch {
            return 'Token informed in the requst is not valid.';
        }
    }

    static async testAutenticateUser(requestUser, databaseUser) {
        try {
            const emailIsCorrect = requestUser.email === databaseUser.email;
            const passwordIsCorrect = await bcrypt.compare(requestUser.password, databaseUser.password);
            if (emailIsCorrect && passwordIsCorrect) {
                return true;
            }
            return false;
        } catch {
            return 'User data is incorrect or not valid.';
        }
    }
}

module.exports = Authentication;
