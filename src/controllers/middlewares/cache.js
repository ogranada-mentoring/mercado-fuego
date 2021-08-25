const redis = require('redis');

const client = redis.createClient();

client.on('error', (error) => {
  console.error(error);
});

function makeKey(req) {
  return `${req.method}_${req.baseUrl}`;
}

function storeObjectInCache(req, object) {
  const key = makeKey(req);
  client.set(key, JSON.stringify(object));
}

function cache(req, res, next) {
  const key = makeKey(req);
  console.log(key);
  console.time('CACHE TIME');
  client.get(key, (error, data) => {
    console.timeEnd('CACHE TIME');
    if (error || !data) {
      next();
    } else {
      res.send(data);
    }
  });
}

function invalidateCache(req) {
  client.DEL(makeKey(req));
}

module.exports = {
  cache,
  storeObjectInCache,
  invalidateCache,
};
