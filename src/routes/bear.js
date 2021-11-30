const { Router, request } = require("express");
const router = Router();
const _ = require("underscore");

const data = require("../bears.json");

//get all bears
router.get("/", (req, res) => {
  res.json(data);
});

//add new bear
router.post("/", (req, res) => {
  const { name, birthday, kindof, owner, beauthy } = req.body;
  if (name && birthday && kindof && owner && beauthy) {
    let id = data.length + 1;
    const newBear = { ...req.body, id };
    console.log(newBear);
    data.push(newBear);
    res.json(data);
  } else res.status(500).json({ error: "There was an error." });
});

module.exports = router;
