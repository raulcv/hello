require('./config/database.js');
const app = require('./app')
let hostname = "localhost";
app.use(require("./routes/index"));
app.use('/api/bears', require('./routes/bear')); 
app.use('/api/users', require('./routes/user'));

//starting server
app.listen(app.get("port"), () => {
  console.log(`server listeting on port http://${hostname}:${app.get("port")}/`);
});
