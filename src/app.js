const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require('path')
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
// require('dotenv').config();
const serverConfig = require('../src/config/serverConfig.js')
const APP_PORT = serverConfig.app.port;
//settings
app.set("port", APP_PORT);
app.set("json spaces", 2);

//Middleware
app.use(morgan());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

module.exports = app;