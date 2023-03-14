const jwt = require('jsonwebtoken');
require('dotenv/config');

class Validate {
    static async validateJWT(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const tokenVerification = await jwt.verify(
                token,
                process.env.SECRET
            );
            if (!tokenVerification) {
                return res
                    .status(401)
                    .json('Token informed in the requst is not valid');
            }
            return next();
        } catch (err) {
            return res
                .status(401)
                .json('Token informed in the requst is not valid');
        }
    }
}

module.exports = Validate;
