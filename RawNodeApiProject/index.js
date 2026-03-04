/*
    Title : Uptime Monitoring application
*/

// dependencies
const http = require('http');
const { HandleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const data = require('./lib/data');

// scaffolding
const app = {};

// to do

data.update('test', 'newFile', { name: 'england', lan: 'eng' }, (err) => {
    console.log(err);
});

// create server
app.createServer = () => {
    const server = http.createServer(HandleReqRes);
    server.listen(environment.port, () => {
        console.log(`listening to port ${environment.port}`);
    });
};

// start the server
app.createServer();
