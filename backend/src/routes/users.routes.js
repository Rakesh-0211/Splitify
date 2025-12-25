const express = require("express");
const router = express.Router();
const controller = require("../controllers/users.controller");
router.post("/", controller.createUser);
router.get("/", controller.getUsers);
router.post("/find-or-create-name", controller.findOrCreateByName);
module.exports = router;
