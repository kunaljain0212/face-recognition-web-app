const express = require("express");
const router = express.Router();

const { handleRegister } = require("../controllers/auth");

router.post("/register", handleRegister);
// router.post("/login", signIn);

module.exports = router;
