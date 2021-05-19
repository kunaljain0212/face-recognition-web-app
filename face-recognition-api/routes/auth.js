const express = require("express");
const router = express.Router();

const { handleRegister, handleSignin } = require("../controllers/auth");

router.post("/register", handleRegister);
router.post("/signin", handleSignin);

module.exports = router;
