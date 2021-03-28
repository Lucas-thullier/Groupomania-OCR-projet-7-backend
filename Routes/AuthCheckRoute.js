const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, (req, res, next) => {
  res.status(200).send();
});

module.exports = router;
