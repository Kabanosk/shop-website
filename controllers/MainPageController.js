const path = require("path");
const fs = require('fs');
const ItemService = require('../services/ItemService')

module.exports = class MainPageController{
    static async openMainPage(req, res, next){
        try{
            const items = await ItemService.getAllItems();
            res.render("index", {items: items});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async selectMainPageOption(req, res, next){
        try{
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
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async searchForItem(req, res, next){
        try{
            let phrase = req.params.phrase;
            let filteredItems = await ItemService.getItemsByPhrase(phrase);
            res.render("index", { items: filteredItems});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }
}