"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Storie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Storie.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      short_description: DataTypes.TEXT("long"),
      description: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "Storie",
      tableName: "stories",
    },
  );
  return Storie;
};
