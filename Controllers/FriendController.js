const Friend = require("../Models/Friend");

exports.getAllFriends = (req, res, next) => {
  Friend.getFriendsOf(req.query.userId).then((allFriends) => {
    return res.send(allFriends);
  });
};
