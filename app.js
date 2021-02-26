/* Déclaration différents élements composant l'application */
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

/* On initialise les routes */
// const userRoutes = require("./routes/UserRoute");

/* Définit les types de requetes possibles et l'origine autorisée de ces dernières */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

/* Pour parser le corps des requetes */
app.use(bodyParser.json());

/* Routes de l'API */
app.use("/api/", sauceRoutes);

module.exports = app;
