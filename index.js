const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser")
const process = require("process");
const path = require("path");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const fs = require('fs');

const app = express();

/* Implement routes */
const items = require('./routes/item.routes')
const users = require('./routes/user.routes')
const mainpage = require('./routes/main.routes')

/* Connect to database routes */
main().catch(err => console.log(err));

async function main() {
    const uri = "mongodb+srv://SKOWI:TEST@website.thkbz9w.mongodb.net/primary?retryWrites=true&w=majority";
    await mongoose.connect(uri);
}

/* Setup app settings */
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

/* Add routes */
app.use("/", items);
app.use("/", users);
app.use("/", mainpage);

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

/* Host app */
let PORT = 3000
app.listen(PORT);
console.log(`started at https://localhost:${PORT}/`);


