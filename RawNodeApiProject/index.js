/*
    Title : Uptime Monitoring application
*/

// dependencies
const http = require('http');
const { HandleReqRes } = require('./helpers/handleReqRes');
const environment = require('./helpers/environment');
const data = require('./lib/data');
const { sendTwilionSms } = require('./helpers/notification');

// scaffolding
const app = {};

// to do//

// data.update('test', 'newFile', { name: 'england', lan: 'eng' }, (err) => {
// console.log(err);
// });
/*
data.delete('test', 'newFile', (err) => {
    console.log(err);
});
*/
// todo remove late
sendTwilionSms('01815189237', 'hello world', (err) => {
    console.log(`this is the nandan ${err}`);
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
