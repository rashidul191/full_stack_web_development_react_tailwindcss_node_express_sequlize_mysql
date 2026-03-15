"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ContentManage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContentManage.belongsTo(models.Menu, {
        foreignKey: "menu_id",
        as: "menu",
      });
    }
  }
  ContentManage.init(
    {
      menu_id: DataTypes.INTEGER,
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: DataTypes.STRING,
      short_description: DataTypes.TEXT,
      description: DataTypes.TEXT("long"),
      meta_title: DataTypes.STRING,
      meta_keywords: DataTypes.TEXT("long"),
      meta_description: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "ContentManage",
      tableName: "content_manages",
    },
  );
  return ContentManage;
};
