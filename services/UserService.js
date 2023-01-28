const User = require("../model/User");
const fs = require('fs');
const Item = require("../model/Item");

module.exports = class UserService{
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
            return await User.find({name: phrase});
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
            User.findByIdAndUpdate(_id, updated_user);
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }

    static async deleteUser(_id) {
        try {
            User.findByIdAndDelete(_id);
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }
}