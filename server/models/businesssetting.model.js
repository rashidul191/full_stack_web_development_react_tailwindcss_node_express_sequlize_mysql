module.exports = (sequelize, DataTypes) => {
  const BusinessSetting = sequelize.define(
    "BusinessSetting",
    {
      key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "business-settings",
    },
  );

  return BusinessSetting;
};
