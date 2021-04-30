const express = require("express");
const router = express.Router();
const auth = require("@middlewares/auth");
const FeedPostCommentController = require("@controllers/FeedPostCommentController");

router.get("/all", FeedPostCommentController.getByPostId);
router.post("/new", FeedPostCommentController.new);
// router.delete("/delete", FeedPostCommentController.delete);

module.exports = router;
