const { DataTypes } = require('sequelize');

function createPostModel(connection) {
  const Post = connection.define('Post', {
    // Model attributes are defined here
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    summary: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    content: {
      type: DataTypes.TEXT,
    },
  }, {
    // Other model options go here
  });
  return Post;
}

module.exports = {
  createPostModel,
};
