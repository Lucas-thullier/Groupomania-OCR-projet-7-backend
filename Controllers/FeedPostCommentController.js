const { FeedPostComment } = require("@models/index");
const { getUserIdWithToken } = require("@libs/Helper");

exports.getByPostId = (req, res, next) => {
  const postId = req.query.postId;
  const offset = req.query.offset == 0 ? null : parseInt(req.query.offset);

  FeedPostComment.getCountForPostId(postId)
    .then((count) => {
      FeedPostComment.getByPostId(postId, offset)
        .then((comments) => {
          res.send({
            comments: comments,
            count: { count },
          });
          logger.info("Fetching comments of feedpost success");
        })
        .catch((error) => {
          logger.error(error);
          logger.error("error during fetching comments of feedpost");
        });
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during fetching comments count");
    });
};

exports.new = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);
  const postId = req.body.postId;
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
  const commentId = req.query.commentId;

  FeedPostComment.deleteOne(commentId)
    .then(() => {
      res.send(true);
      logger.info("comment deletion success");
    })
    .catch((error) => {
      logger.error(error);
      logger.error("error during comment deletion");
    });
};
