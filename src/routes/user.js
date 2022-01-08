const { Router, request } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
// const _ = require("underscore");
const bcrypt = require("bcrypt");

const User = require("../models/user");
const isAuthenticated  = require("../helpers/auth");

router.post("/register", async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!(email && password && firstname && lastname)) {
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
      firstname: firstname,
      lastname: lastname,
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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: "1h" });
      user.token = token;
      res.status(200).json(user);
    } else res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    let id = req.params.id;
    const user = await User.findById(id);
    // console.log(user);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
});
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const users = await User.find();
    // console.log(users);
    res.status(201).json(users);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update/:id",isAuthenticated, async (req, res) => {
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
    const user = await User.findByIdAndUpdate(req.params.id, {
      firstname: first_name,
      lastname: last_name,
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
module.exports = router;
