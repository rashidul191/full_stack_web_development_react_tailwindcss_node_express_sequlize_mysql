"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("content_manages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      menu_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "menus", // table name
          key: "id", // column name
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: Sequelize.STRING,
      },

      short_description: {
        type: Sequelize.TEXT("logn"),
      },
      description: {
        type: Sequelize.TEXT("long"),
      },

      meta_title: {
        type: Sequelize.STRING,
      },
      meta_keywords: {
        type: Sequelize.TEXT("long"),
      },
      meta_description: {
        type: Sequelize.TEXT("long"),
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("content_manages");
  },
};
