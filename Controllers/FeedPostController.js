const Conversation = require("../Models/Conversation");
const User = require("../Models/User");
const Message = require("../Models/Message");
const Helper = require("../libs/Helper");
const FeedPost = require("../Models/FeedPost");
const FeedPostComments = require("../Models/FeedPostComment");

exports.getFeedPost = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  User.findOne({
    where: {
      id: userId,
    },
    attributes: ["id"],
    include: {
      model: User,
      as: "friend",
      attributes: ["id", "imageUrl", "username"],
      include: {
        model: FeedPost,
      },
      through: [],
    },
  })
    .then((userWithFriendPost) => {
      let feedPost = [];
      userWithFriendPost.getDataValue("friend").forEach((friendWithPost) => {
        friendWithPost.getDataValue("FeedPosts").forEach((post) => {
          feedPost.push({
            friend: friendWithPost,
            post: post,
          });
        });
      });
      res.send(feedPost);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.createFeedPost = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  const textContent = req.body.textContent;
  const imageUrl = req.body.imageUrl;

  FeedPost.create({
    user_id: userId,
    text_content: textContent,
    image_url: imageUrl ? imageUrl : null,
  })
    .then(() => {
      res.send(true);
    })
    .catch((error) => console.log(error));
};

exports.getComments = (req, res, next) => {
  const postId = req.query.postId;
  FeedPostComments.findAll({
    where: {
      feedpost_id: postId,
    },
    include: {
      model: User,
      attributes: ["username", "imageUrl", "id"],
    },
    order: [["createdAt", "ASC"]],
  })
    .then((feedPostComments) => {
      res.send(feedPostComments);
    })
    .catch((error) => console.log(error));
};

exports.newComment = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);

  const messageContent = req.body.messageContent;
  const postId = req.body.postId;

  FeedPostComments.create({
    feedpost_id: postId,
    text_content: messageContent,
    user_id: userId,
  })
    .then(() => {
      res.send("true");
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.query.commentId;
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);

  FeedPostComments.findOne({
    attributes: ["id", "user_id"],
    where: {
      id: commentId,
      user_id: userId,
    },
  })
    .then((commentOfUser) => {
      //TODO a tester avec un autre compte voir si securite OK
      if (commentOfUser != null) {
        FeedPostComments.destroy({
          where: {
            id: commentId,
          },
        })
          .then((deletionResponse) => {
            res.send("true");
          })
          .catch((error) => console.log(error));
      } else {
        res.send("Ce commentaire n'est pas le votre");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.deleteFeedPost = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  const feedPostId = 3;

  FeedPost.findOne({
    where: {
      id: feedPostId,
    },
    attributes: ["id"],
  })
    .then((wantedFeedPost) => {
      if (wantedFeedPost.getDataValue("id") == userId) {
        FeedPost.destroy(
          {
            where: {
              id: feedPostId,
            },
          }
            .then(() => {
              res.send("suppression reussie");
            })
            .catch((error) => console.log(error))
        );
      } else {
        res.send("vous n'etes pas le createur de ce post");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
