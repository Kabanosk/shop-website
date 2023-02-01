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
            console.log(`Could not login ${error}`);
            throw error;
        }
    }

    static async tryRegister(email, pass, name, surname){
        try {
            const checkUser = await User.find({email : email});
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
            let newUser = await User.create(obj);
            newUser.save();
            return newUser;
        }
        catch (error) {
            console.log(`Could not register ${error}`);
            throw error;
        }
    }
    
    static async getAllUsers() {
        try {
            return await User.find();
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }

    static async getUsersByPhrase(phrase) {
        try {
            var regex = new RegExp(phrase);

            return await User.find({"$or": [
                {name: { $regex: regex }},
                {surname: { $regex: regex }}]});
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }

    static async getUserById(userId) {
        try {
            return await User.findById({_id: userId});
        } catch (error) {
            console.log(`Item not found. ${error}`)
            throw error
        }
    }

    static async addUser(email, name, surname, password, cart) {
        try {
            let new_user = {
                email: email,
                name: name,
                surname: surname,
                password: password,
                cart: cart
            }

            User.create(new_user, (err, item) => {
                if (err) {
                    throw err;
                } else {
                    item.save();
                }
            });
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }

    static async updateUser(_id, updated_user) {
        try {
            await User.findByIdAndUpdate(_id, updated_user);
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }

    static async deleteUser(_id) {
        try {
            await User.findByIdAndDelete(_id);
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }
}