const { Router } = require('express');
const router = Router();

//Raiz

//Raiz
router.get('/', (req, res) => {res.json("Holiii")})

module.exports = router;
