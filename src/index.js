const express = require('express');
const { config } = require('dotenv');

function main() {
    config();
    const PORT = process.env.PORT || 3000;
    const server = express();
    server.use(express.json());
    server.use(express.urlencoded({extended: false}));

    server.listen(PORT, () => {
        // callback
        console.log('Server is running...');
    });
}

main();

