const { Router } = require('express');
const db = require('../../model');
const { cache, storeObjectInCache, invalidateCache } = require('../middlewares/cache');

function makeRouter() {
  const router = Router();

  router.get('/', cache, async (req, res) => {
    console.time('POSTS TIME');
    const model = db.getModel('Post');
    const data = await model.findAll({});
    console.timeEnd('POSTS TIME');
    storeObjectInCache(req, data);
    res.status(200).json(data);
  });

  router.post('/', cache, async (req, res) => {
    console.time('POSTS TIME');
    const model = db.getModel('Post');
    const elm = await model.create({
      name: req.body.name,
      summary: req.body.summary,
      content: req.body.content,
    });
    console.timeEnd('POSTS TIME');
    invalidateCache({
      method: 'GET',
      baseUrl: req.baseUrl,
    });
    res.status(200).json(elm);
  });

  return router;
}

module.exports = {
  makeRouter,
};
