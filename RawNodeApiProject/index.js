/*
    Title : Uptime Monitoring application
    */

// dependencies
const http = require('http');
const { HandleReqRes } = require('./helpers/handleReqRes');

// scaffolding
const app = {};
app.config = {
    port: 3000,
};

// create server
app.createserver = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
        console.log('hello nandan');
    });
};
// handle request response
app.handleReqRes = HandleReqRes;
// start the serverapp.createserver();
app.createserver();
