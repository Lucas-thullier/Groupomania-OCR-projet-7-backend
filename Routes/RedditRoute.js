const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const RedditController = require("../Controllers/RedditController");

router.get("/getHotSubreddits", RedditController.getHotSubreddits);
router.get("/getCommentsById", RedditController.getCommentsById);
router.get("/authorize_callback", RedditController.authorize_callback);

module.exports = router;
