const ItemService = require("../../services/ItemService");
const path = require("path");
const fs = require('fs');

module.exports = class AdminItemController {
    static async renderPage(req, res, next){
        try {
            const items = await ItemService.getAllItems();
            if(!items){
                throw Error("Error 404: could not find any items.")
            }
            res.render("admin/items", {
                items: items
            });
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async renderSearchedPage(req, res, next) {
        try{
            let phrase = req.params.phrase;
            let filteredItems = await ItemService.getItemsByPhrase(phrase);
            res.render("admin/items", { items: filteredItems});
        } catch (error) {
            res.status(500).json({error: error});
        }
    }

    static async renderAddingForm(req, res, next){
        try {
            const item = await ItemService.getItemById(res, req, next);
            if(!item){
                res.render("admin/item", {
                    action: "add"
                });
            } else {
                res.render("admin/item", {
                    item: item,
                    action: "update"
                });
            }
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async addItem(req, res, next){
        try {
            await ItemService.addItem(
                req.body.name,
                req.body.desc,
                req.body.image,
                req.body.price,
                req.body.quantity
            );

            res.render("admin/item", {action: "add", msg: "Image added successfully"});
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async updateItem(req, res, next) {
        try {
            const item = ItemService.getItemById(req, res, next);
            if (!item) {
                throw Error("404! Item not found");
            }

            const updated_item = {
                id: item.id,
                name: req.body.name,
                desc: req.body.desc,
                price: req.body.price,
                quantity: req.body.quantity,
                img: req.body.image
            };

            await ItemService.updateItem(item.id, updated_item)
            res.render("admin/item", {item: updated_item, action: "update", msg: "Image updated successfully"});
        } catch (error) {
            res.status(500).json({error: error})
        }
    }

    static async deleteItem(req, res, next) {
        try {
            const item = ItemService.getItemById(req, res, next);

            await ItemService.deleteItem(item.id);
            res.render("admin/items", {items: ItemService.getAllItems(), msg: "Image deleted successfully"});
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}