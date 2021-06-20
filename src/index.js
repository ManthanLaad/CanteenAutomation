// MODULES
require("./db/mongoose");

// PACKAGES
const express = require("express");
const path = require("path");
const hbs = require("hbs");

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

// PORT
app.listen(port, () => {
  console.log("Server started at Port 3000! ");
});
