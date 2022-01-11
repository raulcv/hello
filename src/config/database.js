const mongoose = require("mongoose");
// const { database } = require("./key");
const serverConfig = require("./serverConfig")
// console.log(serverConfig)
// const username = process.env.DB_USER_NAME;
// const password = process.env.DB_PASSWORD;
// const cluster = process.env.DB_CLUSTER;
// const dbname = process.env.DB_NAME;

// const MongoDBConectionString =`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
// const MongoDBConectionString1 =`mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
// console.log(MongoDBConectionString1)
const MongoDBConectionString = serverConfig.db.host + serverConfig.db.port + serverConfig.db.name;
console.log(MongoDBConectionString)

const conexion = async () => {
  await mongoose.connect(MongoDBConectionString, { useNewUrlParser: true });
};
conexion();

