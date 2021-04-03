const sequelize = require("sequelize");
const { Op } = require("sequelize");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const validator = require("validator");
const Conversation = require("../Models/Conversation");
const Friend = require("../Models/Friend");
const Helper = require("../libs/Helper");

exports.signup = (req, res, next) => {
  if (!validator.isStrongPassword(req.body.password)) {
    throw "Le mot de passe doit contenir: une lettre minuscule, une lettre majuscule, un chiffre, " + "un caractère spécial et doit faire plus de 8 caractères.";
  }
  if (!validator.isEmail(req.body.email)) {
    throw "L'adresse mail renseignée n'est pas valide.";
  }
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        username: req.body.username,
        email: req.body.email,
        password: hash,
      })
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.statut(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.statut(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user.id,
            token: jsonWebToken.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.searchUser = (req, res, next) => {
  const searchContent = req.query.searchContent;
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  User.findAll({
    where: {
      username: {
        [Op.like]: `%${searchContent}%`,
      },
    },
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: User,
      as: "friend",
      attributes: {
        exclude: ["password"],
      },
      through: {
        attributes: [],
      },
    },
  })
    .then((userLikeSearch) => {
      userLikeSearch.map((singleUser) => {
        singleUser = singleUser.getDataValue("friend").map((singleFriend) => {
          if (singleFriend.id == userId) {
            singleUser.setDataValue("isAlreadyFriend", true);
            singleUser.isAlreadyFriend = true;
          }
          return singleFriend;
        });
        return singleUser;
      });
      console.log(userLikeSearch);
      res.send(userLikeSearch);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.userById = (req, res, next) => {
  const authToken = req.headers.authorization;
  const searchedUserId = req.query.userId;
  User.findOne({
    where: {
      id: searchedUserId,
    },
    exclude: ["password"],
  })
    .then((singleUser) => {
      res.send(singleUser);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.addFriend = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  const newFriendId = req.body.newFriendId;
  if (userId == newFriendId) {
    res.send("refuse car ami = user connecte");
  } else {
    User.findOne({
      where: {
        id: userId,
      },
      include: {
        model: User,
        as: "friend",
        attributes: [[sequelize.fn("GROUP_CONCAT", sequelize.col("friend.id")), "friendsIds"]],
        through: {
          attributes: [],
        },
      },
      attributes: [],
    })
      .then((userWithAllId) => {
        // le group_concat ci dessus renvoie un array avec un seul element contenant une chaine de caractere = a l'ensemble des ids des amis
        let friendsIds = userWithAllId.getDataValue("friend")[0].getDataValue("friendsIds");
        friendsIds = friendsIds.split(",");
        if (!friendsIds.includes(newFriendId)) {
          Friend.create({
            user_a: userId,
            user_b: newFriendId,
          })
            .then(() => {
              res.send("Creation reussie");
            })
            .catch((error) => {
              console.log("erreur au moment de la creation d'un nouvel ami");
              console.log(error);
            });
        } else {
          res.send("Incroyable ! Vous etes deja amis");
        }
      })
      .catch((error) => {
        console.log("erreur au moment de la recuperation de l'ensemble des amis de l'utilisateur");
        console.log(error);
      });
  }
};
exports.searchFriendUsers = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  const searchContent = req.query.searchContent;
  User.findOne({
    where: {
      id: userId,
    },
    include: {
      model: User,
      as: "friend",
      where: {
        username: {
          [Op.like]: `%${searchContent}%`,
        },
      },
      attributes: {
        exclude: ["password"],
      },
      through: {
        attributes: [],
      },
    },
    attributes: {
      exclude: ["password"],
    },
  })
    .then((result) => {
      if (result && result.getDataValue("friend")) {
        res.send(result.getDataValue("friend"));
      } else {
        res.send("");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.getFriendsByUserId = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);

  User.findOne({
    where: {
      id: userId,
    },
    attributes: {
      exclude: ["password"],
    },
    include: {
      model: User,
      as: "friend",
      attributes: {
        exclude: ["password", "friend"],
      },
      through: {
        attributes: [],
      },
    },
  })
    .then((userWithFriends) => {
      const friends = userWithFriends.getDataValue("friend");
      res.send(friends);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.changeProfilPicture = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  console.log(req.file);
  User.update(
    {
      imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    },
    {
      where: {
        id: userId,
      },
    }
  )
    .then((updatedUser) => {
      res.send("update effectue");
    })
    .catch((error) => {
      console.log(error);
    });
};
