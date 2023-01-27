const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser")
const process = require("process");
const path = require("path");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const fs = require('fs');

const app = express();

/* routers */
const items = require('./routes/item.routes')



main().catch(err => console.log(err));

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


app.use("/", items);


app.get("/", async (req, res) => {
    console.log(req.session);
    const items = await Item.find();
    res.render("index", {items: items});
});
app.post("/", async (req, res) => {

   if (req.body.profile) {
       if (req.session.user) {
           res.redirect("profile");
       } else {
           res.redirect("login");
       }
   }
   if (req.body.add)
   {
    res.redirect("add");
   }
   if (req.body.searchbar) {
       let searchPhrase = req.body.searchbar;
       res.redirect("/search/" + searchPhrase);
   } else 
   {
    const items = await Item.find();
    res.render("index", {items: items});
   }
});
app.get("/search/:phrase", async (req, res) => {
    let phrase = req.params.phrase;

    let filteredItems = await Item.find({name : phrase});
    
    console.log(filteredItems);
    res.render("index", { items: filteredItems});
    
});

app.get("/profile", (req, res) => {
    let user = req.session.user;
    if (!user) {
        res.redirect("login");
    }
    res.render("profile", {
        email: user.email,
        password: user.password,
        name: user.name,
        surname: user.surname
    });
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    // TODO: authentication and add to session
    if (req.body["register"]) {
        console.log("chuj");
        res.redirect("register");
        return;
    }
    console.log(req.body)
    let email = req.body.email,
        password = req.body.password;
    req.session.user = {email: email, password: password, card: items};
    res.redirect("/");
});

app.get("/register", (req, res) => {
    res.render("register");
});
app.post("/register", (req, res) => {
    // TODO: authentication, adding user and add to session
    let email = req.body.email,
        password = req.body.password,
        name = req.body.name,
        surname = req.body.surname;
    req.session.user = {
        email: email,
        password: password,
        name: name,
        surname: surname,
        card: items
    };
    res.redirect("/");
});

app.get("/card", (req, res) => {
    let user = req.session.user;
    if (!user) {
        res.redirect("login");
    }
    res.render("card", {items: user.card});
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

let PORT = 3000
app.listen(PORT);
console.log(`started at https://localhost:${PORT}/`);


