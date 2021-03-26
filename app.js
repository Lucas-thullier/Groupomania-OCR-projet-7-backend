require("dotenv").config();
const express = require("express");
const fs = require("fs");

const app = express();

/* On initialise les routes */
const UserRoute = require("./Routes/UserRoute");
const FeedPostRoute = require("./Routes/FeedPostRoute");
const ConversationRoute = require("./Routes/ConversationRoute");
const FriendsRoute = require("./Routes/FriendsRoute");
const MessageRoute = require("./Routes/MessageRoute");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

app.use(express.json());

app.use("/user", UserRoute);
app.use("/conversation", ConversationRoute);
app.use("/friends", FriendsRoute);
app.use("/messages", MessageRoute);

module.exports = app;
