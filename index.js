const express = require("express");
const session = require("express-session");
const process = require("process");
const path = require("path");
const bodyParser = require("body-parser");
const {serialize} = require("express-session/session/cookie");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");

app.set("views", path.join(process.cwd(), "views"));
app.use(express.static("static"));

let item = { // Example item
    name: "Test",
    img: ["test.jpg"],
    desc: "Lorem ipsum dolor",
    price: 20
}
const items = [item, item, item, item]; // Example items

app.get("/", (req, res) => {
    res.render("index", {items: items});
});
app.post("/", (req, res) => {

   if (req.body.profile) {
       res.redirect("profile");
   }
   if (req.body.searchbar) {
       let searchPhrase = req.body.searchbar;
       res.redirect("/search/" + searchPhrase);
   }
});
app.get("/search/:phrase", (req, res) => {
    let phrase = req.params.phrase;
    let filteredItems; // TODO: searching through the database by phrase
    res.render("index", { items: filteredItems});
});

app.get("/profile", (req, res) => {
    res.render("profile");
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    // TODO: authentication and add to session
    let email = req.body.email,
        password = req.body.password;
    res.redirect("/");
});

app.get("/register", (req, res) => {
    res.render("register");
});
app.post("/register", (req, res) => {
    // TODO: authentication, adding user and add to session
    let email = req.body.email,
        password = req.body.password;
    res.redirect("/");
});


app.get("/item", (req, res) => {
    res.render("item", {item: item});
});
app.get("/card", (req, res) => {
    res.render("card", {items: items});
});

app.post("/card/checkout", (req, res) => {
    // TODO: add order to db, clear user card
    res.send("Order completed successfully!");
});
app.post("/card/add", (req, res) => {
    // TODO: add to user's card list
    //  if user not logged in then res.redirect("register/login", item)
    //  - after successful login add item to card
});

app.listen(3000);
console.log("started");