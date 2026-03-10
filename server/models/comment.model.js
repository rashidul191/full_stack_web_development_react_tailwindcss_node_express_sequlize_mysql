module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      blogId: {
        // foreign key
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "comments", 
    },
  );
  Comment.associate = function (models) {
    // comment একটি blog-এর সাথে belong করে
    Comment.belongsTo(models.Blog, {
      foreignKey: "blogId",
      as: "blog",
      onDelete: "CASCADE",
    });
  };
  return Comment;
};
