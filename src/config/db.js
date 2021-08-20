const faker = require('faker');
const { getModel } = require('../model');

async function initialize() {
  const User = getModel('User');
  const Post = getModel('Post');
  const current = await User.findOne({
    username: 'admin',
  });
  if (!current) {
    User.create({
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      password: 'Mimamamemimamemimamimama123*',
    });
    for (let i = 0; i < 2000; i += 1) {
      const title = faker.name.title();
      const summary = `Created by ${faker.internet.email()}`;
      const content = faker.lorem.text();
      Post.create({
        title,
        summary,
        content,
      });
    }
  }
}

module.exports = {
  initialize,
};
