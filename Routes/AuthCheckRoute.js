const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const RedditComment = require("../Models/RedditComment");

router.get("/", auth, (req, res, next) => {
  // RedditComment.sync({ alter: true });
  res.status(200).send();
});

module.exports = router;
