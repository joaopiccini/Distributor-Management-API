const User = require('../models/User')
const bcrypt = require('bcryptjs')

class UsersService {

    static async createUser(body) {
        try {
            const user = await User.findOne({email: body.email});
            if(user) {
                return "E-mail já cadastrado."
            } else {
                body.password = await bcrypt.hash(body.password, 10);
                const newUser = await User.create(body);
                return newUser;
            }
        } catch(err) {
            return err;
        }
    }

    static async loginUser(body) {
        try {
            const user = await User.findOne({email: body.email});
            // passwordIsCorrect = await bcrypt.compare(body.password, user.password);
            // if(passwordIsCorrect){
            //     console.log(passwordIsCorrect)
            // }
            if(body.email == user.email && passwordIsCorrect){
                return user;
            }
        } catch(err) {
            return err;
        }
    }

    static async createToken(body) {
        try {
            const user = await User.findOne({email: body.email});
            if(user) {
                return user;
            } else {
                return "Dados do usuário não são válidos."
            }
        } catch(err) {
            return err;
        }
    }

}

module.exports = UsersService