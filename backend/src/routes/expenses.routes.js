const express = require("express");
const router = express.Router();
const controller = require("../controllers/expenses.controller");

router.post("/", controller.addExpense);

module.exports = router;
