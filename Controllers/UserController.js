const User = require("@models/User");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const validator = require("validator");
const Helper = require("@lib/Helper");

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

exports.getById = async (req, res, next) => {
  const userId = req.params.id;
  User.getOne(userId)
    .then((singleUser) => {
      res.send(singleUser);
      logger.info(`get user by ${userId} OK`);
    })
    .catch((error) => {
      logger.error(`get user by ${userId} fail`);
      logger.error(error);
    });
};

exports.searchByName = (req, res, next) => {
  const searchContent = req.query.searchContent;
  const authToken = req.headers.authorization;
  const userId = getUserIdWithToken(authToken);

  User.searchByName(searchContent, userId)
    .then((searchedUsers) => {
      res.send(searchedUsers);
      logger.info("Search User by username OK");
    })
    .catch((error) => {
      logger.error("Search User by username fail");
    });
};

exports.changeProfilPicture = (req, res, next) => {
  const authToken = req.headers.authorization;
  const userId = Helper.getUserIdWithToken(authToken);
  const imagePath = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

  User.changeProfilPicture(userId, imagePath)
    .then(() => {
      logger.info(`Change userPicture OK : ${imagePath}`);
    })
    .catch((error) => {
      logger.info(`Change userPicture fail : ${imagePath}`);
      logger.error(error);
    });
};
