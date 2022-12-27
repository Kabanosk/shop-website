import * as express from "express";
import * as process from "process";
import * as path from "path";

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/profile", (req, res) => {
  res.render("profile");
});

app.listen(3000);
console.log("started");