const mongoose = require("mongoose");
// const { database } = require("./key");
// require('dotenv').config();
// console.log(process.env.DBCON)
let databaseurl = ""
const conexion = async () => {
    // console.log("database: " + database.DBCON);
    console.log("*******************************************************************");
    console.log(process.env.MONGO_URI);
    console.log("*******************************************************************");
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
};
conexion();

