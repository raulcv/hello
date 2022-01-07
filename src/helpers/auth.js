
const jwt = require("jsonwebtoken");

const token_key = process.env.TOKEN_KEY;

const isAuthenticated = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, token_key);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = isAuthenticated;

// const auth = {};

// let authentication = (req, res, next) => {
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash('error_smg', 'Not Authorized');
//     res.redirect('/users/signin');
// };
// auth.isAuthenticated = authentication;

// module.exports = auth;