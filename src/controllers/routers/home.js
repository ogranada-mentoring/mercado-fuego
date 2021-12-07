const { Router } = require('express');
const { getModel } = require('../../model');
const { verify, middlewareLogin } = require('../middlewares/auth');
const { cache, cleanCache } = require('../middlewares/cache');

function createHomeRouter() {
  const router = Router();

  router.get('/', cache, verify, async (req, res) => {
    const Post = getModel('Post');
    console.time('GET POSTS');
    const articles = await Post.findAll({});
    console.timeEnd('GET POSTS');
    req.cache(articles);
    res.json(articles);
  });

  router.post('/', cleanCache, async (req, res) => {
    const article = req.body;
    const Post = getModel('Post');
    await Post.create(article);
    res.json(article);
  });

  router.post('/login', middlewareLogin, (req, res) => {
    res.json({
      token: req.token,
      message: 'You Are Logged in'
    });
  });

  return router;
}

module.exports = {
  createHomeRouter,
};
