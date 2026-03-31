/*
    Title : server library
    des : server related file

    */

// dependencies
const http = require('http');
const { HandleReqRes } = require('../helpers/handleReqRes');
const environment = require('../helpers/environment');

// scaffolding
const server = {};

server.config = {
    port: 3000,
};
// create server
server.createServer = () => {
    const createServerVariable = http.createServer(server.HandleReqRes);
    createServerVariable.listen(server.config.port, () => {
        console.log(`listening to port ${server.config.port}`);
    });
};

// start the server
server.init = () => {
    server.createServer();
};

module.exports = server;
