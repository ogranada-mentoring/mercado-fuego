const Sequelize = require('sequelize');
const { createPostModel } = require('./models/post');
const { createUserModel } = require('./models/users');

const models = {};

async function connect(host, port, username, password, database) {
  const connection = new Sequelize({
    database,
    username,
    password,
    host,
    port,
    dialect: 'mariadb',
    // logging: false
  });
  models.User = createUserModel(connection);
  models.Post = createPostModel(connection);
  try {
    await connection.authenticate();
    await connection.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

function getModel(name) {
  if (!models[name]) {
    global.console.log('No existe');
    return null;
  }
  return models[name];
}

module.exports = {
  connect,
  getModel,
};
