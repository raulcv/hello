const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// require('dotenv').config();

const API_PORT = process.env.API_PORT;
//settings
app.set("port", API_PORT || 8080);
app.set("json spaces", 2);

//Middleware
app.use(morgan());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

module.exports = app;