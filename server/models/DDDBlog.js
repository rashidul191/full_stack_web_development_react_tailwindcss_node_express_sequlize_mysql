module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define(
    "Blog",
    {
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "blogs",     
    },
  );
  Blog.associate = function (models) {
    // একটি blog-এর অনেক comment থাকতে পারে
    Blog.hasMany(models.Comment, {
      foreignKey: "blogId",
      as: "comments",
      onDelete: "CASCADE", // blog delete হলে comment গুলোও delete হবে
    });
  };
  return Blog;
};
