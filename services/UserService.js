const User = require("../model/User");
const fs = require('fs');
const Auth = require("./Auth");
const AuthenticationError = require("../errors/GenericErrors").AuthenticationError;
const StatusCodes = require('http-status-codes').StatusCodes;

module.exports = class UserService{
    static async tryLogin(email, pass){
        try {
            const user = await User.findOne({email : email});
            if (!user){
                throw new AuthenticationError("User with given email was not found.", StatusCodes.NOT_FOUND);
            }

            let hashedPass = await Auth.encrypt(pass, user.salt);
            if (hashedPass == user.hashedPassword)
                return user;
            else
                throw new AuthenticationError("Incorrect password.", StatusCodes.FORBIDDEN);
        }
        catch (error) {
            console.log(`Could not login ${error}`)
            throw error
        }
    }

    static async tryRegister(email, pass, name, surname){
        try {
            const checkUser = await User.find({email : email});
            console.log(checkUser);
            if (checkUser.length > 0)
                throw new AuthenticationError("Email is already registered.", StatusCodes.FORBIDDEN);

            let salt = await Auth.generateSalt();

            var obj = {
                email: email,
                hashedPassword : await Auth.encrypt(pass, salt),
                salt : salt,
                name: name,
                surname: surname,
                cart : []
            }
            User.create(obj, (err, user) => {
                if (err) {
                    throw err;
                }
                else {
                    user.save();
                }
            });
            return true;
        }
        catch (error) {
            console.log(`Could not register ${error}`)
            throw error
        }
    }
}