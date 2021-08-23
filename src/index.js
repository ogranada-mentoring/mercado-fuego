const { config } = require('dotenv');
const { connect } = require('./model/index');
const { initialize } = require('./config/db');
const { makeServer } = require('./server');

async function main() {
  config();
  const PORT = process.env.PORT || 3000;
  const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_NAME,
    DB_PORT,
    DB_HOST,
  } = process.env;
  await connect(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME);
  initialize();
  const server = makeServer();
  server.listen(PORT, () => {
    // callback
    console.log('Server is running...');
  });
}

main();
