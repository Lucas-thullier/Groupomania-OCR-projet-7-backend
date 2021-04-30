const express = require("express");
const router = express.Router();
const auth = require("@middlewares/auth");
// const Friend = require("../models/index");

router.get("/", auth, (req, res, next) => {
  res.status(200).send();
});

module.exports = router;
