const UserService = require("../../services/UserService");
const path = require("path");
const fs = require('fs');

module.exports = class AdminMainController {
    static async renderPage(req, res, next){
        try {
            const users = await UserService.getAllUsers();
            if(!items){
                throw Error("Error 404: could not find any users.")
            }
            res.render("admin/users", {
                users: users
            });
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async redirectPage(req, res, next) {
        try {
            if (req.body.searchbar) {
                let searchPhrase = req.body.searchbar;
                res.redirect("/admin/users/" + searchPhrase);
            }
            if (req.body.users) {
                res.redirect("/admin/users");
            }
            if (req.body.items) {
                res.redirect("/admin/items");
            }
            if (req.body.orders) {
                res.redirect("/admin/orders");
            }
            res.render("admin/users", {users: UserService.getAllUsers()});
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}