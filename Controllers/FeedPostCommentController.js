const { FeedPostComment } = require("@models/index");
const { getUserIdWithToken } = require("@libs/Helper");

exports.getByPostId = (req, res, next) => {
  const postId = req.query.postId;

  FeedPostComment.getByPostId(postId)
    .then((feedPost) => {
      res.send(feedPost);
      logger.info("Fetching feedpost by userId success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during fetching by userId");
    });
};

exports.new = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  const postId = req.query.postId;
  const messageContent = req.body.messageContent;

  FeedPostComment.new(userId, postId, messageContent)
    .then(() => {
      res.send(true);
      logger.info("comment creation success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during comment creation");
    });
};

exports.delete = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);

  FeedPostComment.deleteOne()
    .then(() => {
      res.send(true);
      logger.info("comment deletion success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during comment deletion");
    });
};
