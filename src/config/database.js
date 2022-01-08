const mongoose = require("mongoose");
// const { database } = require("./key");
const username = process.env.USER_NAME;
const password = process.env.PASSWORD_DB;
const cluster = process.env.CLUSTER;
const dbname = process.env.DB_NAME;

const MongoDBConectionString = MONGO_URI=`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
const conexion = async () => {
  await mongoose.connect(MongoDBConectionString, { useNewUrlParser: true });
};
conexion();

