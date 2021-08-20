const { Router } = require('express');
const { getModel } = require('../../model');
const { authorize, authenticate, encript } = require('../middlewares/auth');

function makeRouter() {
  const router = Router();

  // TO DO
  router.get('/', (req, res) => {
    res.send('Hola Mundo!');
  });

  router.get('/admin/users', authorize, async (req, res) => {
    if (req.user.rol === 'admin') {
      const User = getModel('User');
      const data = await User.findAll({});
      res.status(200).json(data);
    } else {
      res.status(401).json('You have no access to this place...');
    }
  });

  router.post('/admin/login', authenticate, async (req, res) => {
    res.send({
      status: 'OK',
      token: req.token,
    });
  });

  router.post('/admin/register', async (req, res) => {
    const User = getModel('User');
    try {
      await User.create({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: encript(req.body.password),
        email: req.body.email,
      });
      res.send({
        status: 'OK',
      });
    } catch (error) {
      res.status(406).send({
        status: 'Fail',
        message: error.message,
      });
    }
  });

  return router;
}

module.exports = {
  makeRouter,
};
