const express = require("express");
const router = express.Router();

const {
  handleRegister,
  handleSignin,
  handleProfile,
} = require("../controllers/auth");

router.post("/register", handleRegister);
router.post("/signin", handleSignin);
router.get("/profile/:id", handleProfile);

module.exports = router;
