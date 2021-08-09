const Sequelize = require("sequelize");
const { createUserModel } = require("./models/users");
const { createBandModel } = require("./models/band");
const { createAlbumModel } = require("./models/album");
const { createSongModel } = require("./models/song");
const { createAlbumSongModel } = require("./models/album_song");

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
  // models.User.sync();
  models.Band = createBandModel(connection);
  models.Album = createAlbumModel(connection);
  models.Song = createSongModel(connection);
  models.AlbumSong = createAlbumSongModel(connection, models.Album, models.Song);

  models.Band.hasMany(models.Album);
  models.Album.belongsTo(models.Band);

  models.Album.belongsToMany(models.Song, { through: models.AlbumSong });
  models.Song.belongsToMany(models.Album, { through: models.AlbumSong });
  
  try {
    await connection.authenticate();
    await connection.sync({
      // alter: true
    });
    console.log('Connection has been established successfully.');
   return true;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return false;
  }
}

function getModel(name) {
  if (models[name]) {
    return models[name];
  } else {
    console.error(`Model ${name} does not exists.`);
    return null;
  }
}

module.exports = {
  connect,
  getModel
};
