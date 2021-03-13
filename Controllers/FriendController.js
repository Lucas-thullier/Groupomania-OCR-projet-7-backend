const Friend = require("../Models/Friend");

exports.getAllFriends = (req, res, next) => {
  Friend.getFriendsOf(1).then((allFriends) => {
    return res.send(allFriends);
  });
};
