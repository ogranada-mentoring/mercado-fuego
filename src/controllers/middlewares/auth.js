const jwt = require('jsonwebtoken');
const { createHmac } = require('crypto');
const { getModel } = require('../../model');

function encript(secret) {
  return createHmac('sha256', secret).digest('hex');
}

function authorize(req, res, next) {
  const { JWT_SECRET } = process.env;
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  console.log(token);
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(401).send('You are not authorized.   .|.');
    } else {
      req.user = decoded;
      next();
    }
  });
}

async function authenticate(req, res, next) {
  const { JWT_SECRET } = process.env;
  const { username, password } = req.body;
  const User = getModel('User');
  console.log(encript(password));
  const loginUser = await User.findOne({
    where: {
      username,
      password: encript(password),
    },
  });
  if (loginUser) {
    req.token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + 60,
      firstName: loginUser.firstName,
      lastName: loginUser.lastName,
      username: loginUser.username,
      email: loginUser.email,
    }, JWT_SECRET);
    next();
  } else {
    res.status(403).send('invalid credentials');
  }
}

module.exports = {
  authorize,
  authenticate,
  encript,
};
