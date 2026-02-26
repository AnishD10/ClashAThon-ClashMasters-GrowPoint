const express = require("express");
const { getInterestOptions } = require("../controllers/interestController");

const router = express.Router();

router.get("/options", getInterestOptions);

module.exports = router;
