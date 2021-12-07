const redisDb = require('redis');

const redis = redisDb.createClient();

redis.on('error', (error) => {
  console.error(error);
});

function cache(req, res, next) {
  const url = `${req.method}_${req.url}`;
  req.cache = (data) => {
    redis.set(url, JSON.stringify(data), () => {
      // res.send(data);
    });
  };
  if (!url) {
    next();
  } else {
    redis.get(url, (err, cached) => {
      if (err || !cached) {
        // Do something
        next();
      } else {
        console.log('Using cache...');
        res.send(cached);
      }
    });
  }
}

function cleanCache(req, res, next) {
  const url = `GET_${req.url}`;
  redis.DEL(url);
  next();
}

module.exports = {
  cache,
  cleanCache,
};
