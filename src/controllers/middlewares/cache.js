const redis = require('redis');

let client = null;

function getRedisClient() {
  if (!client) {
    client = redis.createClient();
    getRedisClient().on('error', (error) => {
      console.error(error);
    });
  }
  return client;
}

function makeKey(req) {
  return `${req.method}_${req.baseUrl}`;
}

function storeObjectInCache(req, object) {
  const key = makeKey(req);
  getRedisClient().set(key, JSON.stringify(object));
}

function cache(req, res, next) {
  const key = makeKey(req);
  console.log(key);
  console.time('CACHE TIME');
  getRedisClient().get(key, (error, data) => {
    console.timeEnd('CACHE TIME');
    if (error || !data) {
      next();
    } else {
      res.send(data);
    }
  });
}

function invalidateCache(req) {
  getRedisClient().DEL(makeKey(req));
}

module.exports = {
  cache,
  storeObjectInCache,
  invalidateCache,
};
