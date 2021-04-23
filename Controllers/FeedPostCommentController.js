const { getUserIdWithToken } = require("@lib/Helper");
const FeedPost = require("@models/FeedPost");
const FeedPostComments = require("@models/FeedPostComment");

exports.getComments = (req, res, next) => {
  const postId = req.query.postId;

  FeedPost.getComments(postId)
    .then((feedPostComments) => {
      res.send(feedPostComments);
      logger.info("fetching feedpostComments OK");
    })
    .catch((error) => {
      logger.error("fetching feedpostComments failed");
      logger.error(error);
    });
};

exports.newComment = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);

  const messageContent = req.body.messageContent;
  const postId = req.body.postId;

  FeedPostComments.newComment(postId, messageContent, userId)
    .then(() => {
      res.send("true");
      logger.info("feedPostComment creation OK");
    })
    .catch((error) => {
      logger.error("feedPostComment creation failed");
      logger.error(error);
    });
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.query.commentId;
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);

  FeedPostComments.deleteComment(commentId, userId)
    .then(() => {
      logger.info("delete feedpost comment OK");
    })
    .catch((error) => {
      logger.error("error during feedpost comment deletion");
      logger.error(error);
    });
};
