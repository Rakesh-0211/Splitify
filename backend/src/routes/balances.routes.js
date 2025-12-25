const express = require("express");
const router = express.Router();
const controller = require("../controllers/balances.controller");

router.get("/", controller.getBalances);

module.exports = router;
