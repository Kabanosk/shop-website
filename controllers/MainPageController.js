const path = require("path");
const fs = require('fs');
const ItemService = require('../services/ItemService')

module.exports = class MainPageController{
    static async openMainPage(req, res, next){
        const items = await ItemService.getAllItems();
        res.render("index", {items: items});
    }

    static async selectMainPageOption(req, res, next){
        if (req.body.profile) {
            if (req.session.user) {
                res.redirect("profile");
            } else {
                res.redirect("login");
            }
        }
        else if (req.body.add) {
            res.redirect("add");
        }
        else if (req.body.searchbar) {
            let searchPhrase = req.body.searchbar;
            res.redirect("/search/" + searchPhrase);
        }
        else {
            const items = await ItemService.getAllItems();
            res.render("index", {items: items});
        }
    }

    static async searchForItem(req, res, next){
        let phrase = req.params.phrase;
        let filteredItems = await ItemService.getItemsByPhrase(phrase);
        res.render("index", { items: filteredItems});
    }
}