const sequelize = require("sequelize");
const { Op } = require("sequelize");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const Message = require("../models/Message");
const Helper = require("../libs/Helper");
const FeedPost = require("../models/FeedPost");
const FeedPostComments = require("../models/FeedPostComment");

exports.getFeedPost = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  FeedPost.findAll({
    where: {
      user_id: {
        [Op.or]: [
          userId,
          {
            [Op.in]: sequelize.literal(
              // TODO check si risque d'injection
              `(SELECT friend.id 
                FROM users AS User 
                LEFT OUTER JOIN (
                  friends AS friendFriend 
                    INNER JOIN users AS friend 
                    ON friend.id = friendFriend.user_b) 
                ON User.id = friendFriend.user_a 
                WHERE User.id = '${userId}')`
            ),
          },
        ],
      },
    },
    include: {
      model: User,
      attributes: {
        exclude: ["password"],
      },
    },
    order: [["createdAt", "DESC"]],
  })
    .then((feedPost) => {
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
