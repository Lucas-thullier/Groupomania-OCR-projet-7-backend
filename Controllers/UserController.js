const { Op } = require("sequelize");
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const validator = require("validator");
const Conversation = require("../Models/Conversation");
const Friend = require("../Models/Friend");

exports.signup = (req, res, next) => {
  if (!validator.isStrongPassword(req.body.password)) {
    throw (
      "Le mot de passe doit contenir: une lettre minuscule, une lettre majuscule, un chiffre, " +
      "un caractère spécial et doit faire plus de 8 caractères."
    );
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
  User.findAll({
    where: {
      username: {
        [Op.like]: `%${searchContent}%`,
      },
    },
    attributes: {
      exclude: ["password"],
    },
  })
    .then((userLikeSearch) => {
      res.send(userLikeSearch);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.userById = (req, res, next) => {
  const userId = req.query.userId;
  User.findOne({
    where: {
      id: userId,
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
  const userId = req.body.userId;
  const newFriendId = req.body.newFriendId;
  Friend.create({
    user_a: userId,
    user_b: newFriendId,
  });
};
exports.searchFriendUsers = (req, res, next) => {
  const userId = req.query.userId;
  const searchContent = req.query.searchContent;
  console.log(searchContent);
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
      res.send(result.getDataValue("friend"));
    })
    .catch((error) => {
      console.log(error);
    });
};
