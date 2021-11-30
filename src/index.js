const express = require("express");
const app = express();
const morgan = require("morgan");

//settings
app.set("port", process.env.PORT || 8080);
app.set("json spaces", 2);

//Middleware
app.use(morgan());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require("./routes/index"));
app.use('/api/bears', require('./routes/bear'));

//starting server
app.listen(app.get("port"), () => {
  console.log(`server listeting on port ${app.get("port")}`);
});
