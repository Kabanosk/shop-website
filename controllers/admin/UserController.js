const UserService = require("../../services/UserService");
const path = require("path");
const fs = require('fs');
const HttpError = require("../errors/GenericErrors").HttpError;

module.exports = class AdminUserController {
    static async renderPage(req, res, next){
        try {
            const users = await UserService.getAllUsers();
            if(!users){
                throw Error("Error 404: could not find any users.")
            }
            res.render("admin/users", {
                users: users
            });
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async renderSearchedPage(req, res, next) {
        try{
            let phrase = req.params.phrase;
            let filteredUsers = await UserService.getUsersByPhrase(phrase);
            res.render("admin/users", { users: filteredUsers});
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async renderAddingForm(req, res, next){
        try {
            const user = await UserService.getUserById(res, req, next);
            if(!user){
                res.render("admin/user", {
                    action: "add"
                });
            } else {
                res.render("admin/user", {
                    user: user,
                    action: "update"
                });
            }
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async addUser(req, res, next){
        try {
            await UserService.addUser(
                req.body.email,
                req.body.name,
                req.body.surname,
                req.body.password,
                req.body.cart
            );

            res.render("admin/user", {action: "add", msg: "User added successfully"});
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async updateUser(req, res, next) {
        try {
            const user = UserService.getUserById(req, res, next);
            if (!user) {
                throw Error("404! User not found");
            }

            const updated_user = {
                id: user.id,
                name: req.body.name,
                desc: req.body.desc,
                price: req.body.price,
                quantity: req.body.quantity,
                img: req.body.image
            };

            await UserService.updateUser(user.id, updated_user)
            res.render("admin/user", {user: updated_user, action: "update", msg: "User updated successfully"});
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const user = UserService.getUserById(req, res, next);

            await UserService.deleteUser(user.id);
            res.render("admin/users", {users: UserService.getAllUsers(), msg: "User deleted successfully"});
        } catch (error) {
            if(error instanceof HttpError)
                res.status(error.status_code).json({error: error.message});
            else
                throw error;
        }
    }
}