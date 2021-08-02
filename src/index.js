const express = require('express');
const { config } = require('dotenv');
const { connect } = require('./database/index.js');

async function main() {
    config();
    const PORT = process.env.PORT || 3000;
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({extended: false}));

    const {
        DB_USERNAME,
        DB_PASSWORD,
        DB_NAME,
        DB_PORT,
        DB_HOST,
    } = process.env;
    await connect(DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_NAME);

    server.listen(PORT, () => {
        // callback
        console.log('Server is running...');
    });
}

main();

