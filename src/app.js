const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");

const userRoutes = require("../routes/user.routes");
const publicDir = path.join(__dirname, "../frontend/public");
const viewsDir = path.join(__dirname, "../frontend/views");
const layoutDir = path.join(__dirname, "../frontend/layout");

app.use(express.static(publicDir));

// set the engine (select which engine will be used)
app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(layoutDir, function (err) {});
app.use(userRoutes);
module.exports = app;
