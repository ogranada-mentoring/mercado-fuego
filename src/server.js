const express = require('express');
const { makeRouter: makeUsersRouter } = require('./controllers/routers/users');

function makeServer() {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use('/api/v1/users', makeUsersRouter());

  return server;
}

module.exports = {
  makeServer,
};
