const express = require("express");
const app = express();
const path = require('path')

app.set("port", 8080);
app.set("json spaces", 2);

//Middleware
app.use(express.json());

module.exports = app;
