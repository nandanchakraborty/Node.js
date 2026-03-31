/*
    Title : Uptime Monitoring application
    description : Initial file to start the node server and workers

*/

// dependencies
const server = require('./lib/server');
const workers = require('./lib/worker');

// scaffolding
const app = {};

app.init = () => {
    // start the server

    server.init();
    // start the worker
    workers.init();
};
app.init();
// export the app
module.exports = app;
