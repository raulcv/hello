const app = require('./app')

app.use(require("./routes/index"));

//starting server
app.listen(app.get("port"), () => {
  console.log(`server listeting on port ${app.get("port")}`);
});

