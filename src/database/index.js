const Sequelize = require("sequelize");
const { createProductModel } = require("./models/product");
const { createUserModel } = require("./models/users");

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
  models.Product = createProductModel(connection);
  // models.User.sync();
  try {
    await connection.authenticate();
    await connection.sync();
    console.log('Connection has been established successfully.');
    /*
    const u = new models.User({
      firstName: 'Oscar', 
      lastName: 'Granada', 
      username: 'ogranada', 
      password: 'jajajaja', 
      email: 'ola@aol.co', 
    })
    await u.save();
    u.password = 'Mimamamemima123*';
    const v = await models.User.findOne({
      where: {
        username: 'ogranada'
      }
    })
    await v.save();

    await v.destroy();
    const data = await models.User.findAll();
    console.log(data);
    */
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = {
  connect
};
