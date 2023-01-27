const UserService = require("../services/UserService");
const path = require("path");
const fs = require('fs');

module.exports = class UserController{
    static async openProfile(req, res, next){
        try{
            let user = req.session.user;
            if (!user) {
                res.redirect("login");
            }
            else{
                res.render("profile", {
                    email: user.email,
                    password: user.password,
                    name: user.name,
                    surname: user.surname
                });
            }
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async openLogin(req, res, next){
        try{
            res.render("login");
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async tryLogin(req, res, next){
        try{
            if (req.body["register"]) {
                res.redirect("register");
            }
            else{
                let email = req.body.email,
                    password = req.body.password;

                /*  
                *   TODO: authentication. add this in userService
                */

                req.session.user = {email: email, password: password, card: items};
                res.redirect("/");
            }
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async openRegister(req, res, next){
        res.render("register");
    }

    static async tryRegister(req, res, next){
        try{
            let email = req.body.email,
                password = req.body.password,
                name = req.body.name,
                surname = req.body.surname;

            /*  
            *   TODO: authentication. add this in userService
            */

            req.session.user = {
                email: email,
                password: password,
                name: name,
                surname: surname,
                card: items
            };
            res.redirect("/");
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}