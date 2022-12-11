const express = require("express");
const router = express.Router();
const User = require("../controller/user.controller");

router.get("/", User.index);
router.get("*", User.errorPage);

module.exports = router;
