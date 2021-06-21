// MODULES
require("./db/mongoose");
const infoCount = require("./utils/count");

// PACKAGES
const express = require("express");
const bcrypt = require("bcrypt");
const path = require("path");
const hbs = require("hbs");
const { ObjectID } = require("mongodb");

// MODELS
const User = require("./models/User");
const MenuItem = require("./models/Menu-item");
const Customer = require("./models/Customer");
const Order = require("./models/Order");

// CONFIGS
const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express Config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine, views & partials location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup directory to serve
app.use(express.static(publicPath));
app.use(express.json());

// Current User
var currUser = "";
var check = false;
var code = "";
// ADMIN ENDPOINTS
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/admin", (req, res) => {
  const user = req.body;
  User.find({ name: user.username })
    .then((response) => {
      currUser = response[0];
      // TO GET HASH OF PASSWORD
      // bcrypt.hash(user.password, 10).then(function (hash) {
      //   console.log(hash);
      // });
      code = ObjectID(currUser._id) + Math.random();
      bcrypt.compare(user.password, currUser.password).then(function (result) {
        if (result) {
          res.send({ msg: code, error: false });
        } else {
          res.send({ msg: "Invalid Password", error: true });
        }
      });
    })
    .catch((err) => res.send({ msg: "User not found", error: true }));
});

app.get("/home", async (req, res) => {
  const uId = req.query.userId;
  const { customerC, menuC, orderC } = await infoCount();
  if (uId == code || check) {
    check = true;
    res.render("home", {
      currUser,
      page: "Dashboard",
      customerC,
      menuC,
      orderC,
    });
  } else {
    res.render("404");
  }
});

app.get("/order", async (req, res) => {
  const { customerC, menuC, orderC } = await infoCount();
  res.render("order", { currUser, page: "Orders", customerC, menuC, orderC });
});

app.get("/stock", async (req, res) => {
  const { customerC, menuC, orderC } = await infoCount();
  res.render("stock", { currUser, page: "Stocks", customerC, menuC, orderC });
});

app.get("/menu", async (req, res) => {
  const { customerC, menuC, orderC } = await infoCount();
  res.render("menu", { currUser, page: "Menu", customerC, menuC, orderC });
});

// PORT
app.listen(port, () => {
  console.log("Server started at Port 3000! ");
});
