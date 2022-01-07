const { Router, request } = require("express");
const router = Router();
const jwt = require("jsonwebtoken")
// const _ = require("underscore");
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/register", async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }
    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password with dcrypt package
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      firstname: first_name,
      lastname: last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      { expiresIn: "2h" }
    );
    user.token = token;
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});
router.get("/", async (req, res) => {
    try {
      const users = await User.find();
      // console.log(users);
      res.status(201).json(users);
    } catch (err) {
      console.log(err);
    }
  });
router.get("/One/:id", async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });
router.put("/Update/:id", async (req, res) => {
    try {
      const { first_name, last_name, email, password } = req.body;
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password with dcrypt package
      encryptedPassword = await bcrypt.hash(password, 10);
  
      //find and update
      const user = await User.findByIdAndUpdate(req.params.id, {firstname: first_name, lastname: last_name });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "2h" }
      );
      user.token = token;
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
  });
module.exports = router;