const { Router, request } = require("express");
const router = Router();
const _ = require("underscore");

const data = require("../bears.json");

//get all bears
router.get("/", (req, res) => {
  res.json(data);
});
//Get by id
router.get("/:id", (req, res) => {
  let { id } = req.params;
  let idNumber = parseInt(id);
  const dato = data.filter((x) => x.id === idNumber);
  console.log(dato);
  res.json(dato);
});
//add new bear
router.post("/", (req, res) => {
  const { name, birthday, kindof, owner, beauthy } = req.body;
  if (name && birthday && kindof && owner && beauthy) {
    let id = data.length + 1;
    const newBear = { ...req.body, id };
    // console.log(newBear);
    data.push(newBear);
    res.json(data);
  } else res.status(500).json({ error: "There was an error." });
});

//udpdate a bear
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, birthday, kindof, owner, beauthy } = req.body;
  if (name && birthday && kindof && owner && beauthy) {
    _.each(data, (bear, i) => {
      if (bear.id == id) {
        bear.name = name;
        bear.birthday = birthday;
        bear.kindof = kindof;
        bear.owner = owner;
        bear.beauthy = beauthy;
      }
    });
    res.json(data);
  } else {
    res.status(500).json({ error: "There was an error." });
  }
});

//delete a bear
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  _.each(data, (bear, i) => {
    if (bear.id == id) {
      data.splice(i, 1);
    }
  });
  res.send(data);
});

module.exports = router;
