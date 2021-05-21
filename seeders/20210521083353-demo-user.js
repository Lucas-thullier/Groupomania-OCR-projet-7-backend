"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminPassword = "superAdmin555!";
    const hash = await bcrypt.hash(adminPassword, 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          username: "Admin",
          password: hash,
          email: "admin@mail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "John Doe",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Marie",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: "Tom",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
