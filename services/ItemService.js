const Item = require("../model/Item");
const fs = require('fs');

module.exports = class ItemService{
    static async getAllItems(){
        try {
            return await Item.find();
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }

    static async addItem(name, description, image, price, quantity){
        try {
            var obj = {
                name: name,
                desc: description,
                img: image,
                price: price,
                quantity: quantity
            }
            Item.create(obj, (err, item) => {
                if (err) {
                    throw err;
                }
                else {
                    item.save();
                }
            });
        } catch (error) {
            console.log(`Could not add item ${error}`)
            throw error
        }
    }

    static async getItembyId(itemId){
        try {
            return await Item.findById({_id: itemId});
        } catch (error) {
            console.log(`Item not found. ${error}`)
            throw error
        }
    }

    static async getItemsByPhrase(phrase){
        try {
            return await Item.find({name: phrase});
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }

    static async updateItem(_id, updated_item) {
        // TODO
    }

    static async deleteItem(_id) {
        // TODO
    }
}