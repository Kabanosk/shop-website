const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser")
const process = require("process");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

/* Implement routes */
const items = require('./routes/item.routes')
const users = require('./routes/user.routes')
const mainpage = require('./routes/main.routes')
const carts = require('./routes/carts.routes')

const adminMainPage = require("./routes/admin/main.routes")
const adminItems = require("./routes/admin/item.routes")
const adminUsers = require("./routes/admin/user.routes")
const adminOrders = require("./routes/admin/order.routes")

/* Connect to database routes */
main().catch(err => console.log(err));

async function main() {
    const uri = "mongodb+srv://SKOWI:TEST@website.thkbz9w.mongodb.net/primary?retryWrites=true&w=majority";
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
}

/* Setup app settings */
app.use(
    "/css",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/css"))
);
app.use(
    "/js",
    express.static(path.join(__dirname, "node_modules/bootstrap/dist/js"))
);
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist"))); 

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
app.use("/items", items);
app.use("/users", users);
app.use("/", mainpage);
app.use('/cart', carts);

app.use("/admin", adminMainPage);
app.use("/admin/items", adminItems);
app.use("/admin/users", adminUsers);
app.use("/admin/orders", adminOrders);

/* Host app */
let PORT = 3000
app.listen(PORT);
console.log(`started at https://localhost:${PORT}/`);


