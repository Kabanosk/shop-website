const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser")
const process = require("process");
const path = require("path");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs');
const {serialize} = require("express-session/session/cookie");


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

let upload = multer({ storage: storage });
const app = express();

main().catch(err => console.log(err));

const itemSchema = new mongoose.Schema({
    name: String,
    img:
        {
            data: Buffer,
            contentType: String
        },
    desc: String,
    price: Number
});
const Item = mongoose.model('item', itemSchema);

async function main() {
    const uri = "mongodb+srv://SKOWI:TEST@website.thkbz9w.mongodb.net/?retryWrites=true&w=majority";
    await mongoose.connect(uri);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.set("views", path.join(process.cwd(), "views"));
app.use(express.static("static"));

app.set('trust proxy', 1);
app.use(session({
    secret: 'secret', // TODO: potem zrobić to w jakimś .env-ie
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 3600 }
}));
app.use(cookieParser());


function admin_redirects(req, res) {
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
}

app.get("/admin", async (req, res) => {
    res.redirect("/admin/users");
});

app.get("/admin/users", (req, res) => {
    res.render("admin/users", {users: []}); // TODO: add users from database
});

app.get("/admin/users/:phrase", (req, res) => {
    let filteredUsers = []; // TODO: filter users from db
    res.render("admin/users", {users: filteredUsers});
});

app.post("/admin/users", (req, res) => {

    res.render("admin/users", {users: []}); // TODO: add users from database
});

app.get("/admin/items", (req, res) => {
    res.render("admin/users", {users: []}); // TODO: add users from database
});

app.get("/admin/items/:phrase", (req, res) => {
    let filteredItems = []; // TODO: filter items from db
    res.render("admin/user", {items: filteredItems});
});

app.post("/admin/items", (req, res) => {
    admin_redirects(req, res);
    res.render("admin/items", {items: []}); // TODO: add items from database
});

app.get("/admin/orders", (req, res) => {
    res.render("admin/orders", {orders: []}); // TODO: add orders from database
});

app.get("/admin/orders/:phrase", (req, res) => {
    let filteredOrders = []; // TODO: filter orders from db
    res.render("admin/user", {orders: filteredOrders});
});

app.post("/admin/orders", (req, res) => {
    admin_redirects(req, res);
    res.render("admin/orders", {orders: []}); // TODO: add orders from database
});

let PORT = 3000
app.listen(PORT);
console.log(`started at https://localhost:${PORT}/`);