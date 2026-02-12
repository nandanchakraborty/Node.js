// path module
const path = require('path');

const myptah = ' /media/pranta/G/final semester/Node/modules.js';
console.log(path.basename(myptah));

console.log(path.dirname(myptah));
console.log(path.extname(myptah));
console.log(path.parse(myptah));

// os module

const os = require('os');

console.log(os.platform());
console.log(os.homedir());
console.log(os.freemem());
// console.log(os.cpus());

// file module
const fs = require('fs');

fs.writeFileSync('myfile.txt', 'hello programmers');
fs.appendFileSync('myfile.txt', ' hello nandan');
// sysn means synchronus .dont use synchronus as much as possible
const da = fs.readFileSync('myfile.txt');
console.log(da.toString());

fs.readFile('myfile.txt', (err, data) => {
    console.log(data.toString());
});

console.log('hello');

// Event module
const EventEmitter = require('events');

const emitter = new EventEmitter();
// register a listener for bellRing event
emitter.on('bellRing', ({ period, text }) => {
    console.log(`we need to run because ${period} ${text}`);
});
// raise an event

setTimeout(() => {
    emitter.emit('bellRing', {
        period: 'first',
        text: 'period ended',
    });
}, 2000);

// http moudle

const http = require('http');

const server = http.createServer((req, res) => {
    res.write('hello programers');
    res.end();
});

server.listen(3000); // port number

console.log('listing on server 3000');
