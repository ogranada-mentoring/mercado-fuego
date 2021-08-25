const { DataTypes } = require('sequelize');

function createModel(connection) {
  const User = connection.define('Post', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
  }, {
    // Other model options go here
  });
  return User;
}

module.exports = {
  createModel,
};
