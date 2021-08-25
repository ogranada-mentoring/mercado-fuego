const express = require('express');
const { makeRouter: makeUsersRouter } = require('./controllers/routers/users');
const { makeRouter: makePostsRouter } = require('./controllers/routers/posts');

function makeServer() {
  const server = express();
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  server.use('/api/v1/users', makeUsersRouter());
  server.use('/api/v1/posts', makePostsRouter());

  return server;
}

module.exports = {
  makeServer,
};
