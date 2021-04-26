const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const Friend = require("../models/Friend");
const RedditComment = require("../models/RedditComment");

router.get("/", auth, (req, res, next) => {
  // Friend.sync({ alter: true });
  res.status(200).send();
});

module.exports = router;
