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
            return await Item.find({"$or": [
                {name: { $regex: '(?i)' + phrase }},
                {desc: { $regex: '(?i)' + phrase }}]});
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }

    static async updateItem(_id, updated_item) {
        try {
            await Item.findByIdAndUpdate(_id, updated_item);
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }

    static async deleteItem(_id) {
        try {
            await Item.findByIdAndDelete(_id);
        } catch (error) {
            console.log(`Could not fetch items ${error}`)
            throw error
        }
    }
}