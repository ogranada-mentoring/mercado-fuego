const { Router } = require('express');
const db = require('../../model');

function makeRouter() {
  const router = Router();

  router.get('/', async (req, res) => {
    const User = db.getModel('User');
    const data = await User.findAll({});
    res.status(200).json(data);
  });

  return router;
}

module.exports = {
  makeRouter,
};
