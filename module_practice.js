// http module
const http = require('http');

const server = http.createServer((req, res) => {
    res.write('content-type text/plain');
    const userAgent = req.headers['user-agent'];
    const acceptLanguage = req.headers['accept-language'];
    console.log(req.url); // client all info
    console.log(req.method);
    if (req.url === '/about') {
        res.end('About page');
    } else if (req.url === '/contact') {
        res.end('Contact page');
    } else {
        res.end('404 Not Found');
    }
});
server.listen(3300, () => {
    console.log('listing to port 3300 ...');
});

// event module

const EventEmitter = require('events');
// eventEmitter is a class that we can create event,listen event,and trigger event
const emitter = new EventEmitter();
emitter.on('bellring', ({ period, text }) => {
    console.log(`we need to run because ${period} ${text}`);
});

setTimeout(() => {
    emitter.emit('bellring', {
        period: 'first',
        text: 'period ended',
    });
}, 2000);
