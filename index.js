const express = require("express");
const session = require("express-session");
const process = require("process");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.use(express.static("static"));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.get("/login", (req, res) => {
    res.render("login", {"type": "login"});
});

app.post("/login", (req, res) => {
    // TODO: authentication and add to session
    let email = req.body.email,
        password = req.body.password;
    res.redirect("/");
});

app.get("/register", (req, res) => {
    res.render("login", {"type": "register"});
});
app.post("/register", (req, res) => {
    // TODO: authentication, adding user and add to session
    let email = req.body.email,
        password = req.body.password;
    res.redirect("/");
});


app.get("/item", (req, res) => {
    res.render("item");
});
app.post("/item", (req, res) => {
    // TODO: add to user's card list
    // TODO: if user not logged in then res.redirect("register/login", item)
    //  - after successful login add item to card
});

app.get("/card", (req, res) => {
    let item = {
        name: "Test",
        img: ["test.jpg"],
        desc: "Lorem ipsum dolor",
        price: 20
    }
    let items = [item, item, item, item];
    res.render("card", {items: items});
});
app.post("/card", (req, res) => {
    // TODO: add order to db, clear user card
    res.send("Order completed successfully!");
});

app.listen(3000);
console.log("started");