"use strict";
exports.__esModule = true;
var express = require("express");
var process = require("process");
var path = require("path");
var app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));
app.get("/", function (req, res) {
    console.log(process.cwd());
    res.render("index");
});
app.get("/profile", function (req, res) {
    res.render("profile");
});
app.listen(3000);
console.log("started");
