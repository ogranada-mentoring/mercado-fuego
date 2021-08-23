// Utils file

function add(a, b) {
  return a + b;
}

function rem(a, b) {
  return add(a, -b);
}

module.exports = {
  add,
  rem,
};
