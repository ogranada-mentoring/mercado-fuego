
const middlewareLogin = async (req, res, next) => {
  const CLAVE = process.env.JWT_KEY;
  const datos = req.body;
  // promise chaining
  // encademaniento de promesas

  const token = await User.find({
    username: datos.username,
    password: datos.password
  }).then((user) => {  // DATOS QUE VIENEN DE LA BASE DE DATOS EN LA VARIABLE user
    const token = jwt.sign({
      username: user.username,
      roles: user.roles
    }, CLAVE);
    return token;
  })
  .catch(error => res.status(401).send('fail'))
  ;

  if (token) {
    req.token = token;
    next();
  }
  res.status(401).send('Ususario o clave invalido')
};

const verify = (req, res, next) => {
  const CLAVE = process.env.JWT_KEY;
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, CLAVE)
    if (payload) {
      next();
    }
    res.status(401).send('invalid info');
  } catch (error) {
    res.status(406).send(error.message || 'invalid info');
  }
}

module.exports = {
  verify,
  middlewareLogin,
};
