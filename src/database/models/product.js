const { Sequelize, DataTypes } = require('sequelize');

function createProductModel(connection) {
  const Product = connection.define('Product', {
    // Model attributes are defined here
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
      // allowNull defaults to true
    },
    price: {
      type: DataTypes.DOUBLE
    }
  }, {
    // Other model options go here
  });
  return Product;
}

module.exports = {
  createProductModel
}
