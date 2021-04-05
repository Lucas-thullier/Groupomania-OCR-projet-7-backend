const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Friend = require("../Models/Friend");
const RedditComment = require("../Models/RedditComment");

router.get("/", auth, (req, res, next) => {
  // Friend.sync({ alter: true });
  res.status(200).send();
});

module.exports = router;
