const express = require("express");
const router = express.Router();

const { handleApiCall, handleImage } = require("../controllers/image");

router.post("/apiCall", handleApiCall);
router.put("/updateEntries", handleImage);

module.exports = router;
