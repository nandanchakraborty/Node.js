const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    if (req.url === ' ') {
        res.write('hello');
    } else if (req.url === '/about') {
        const myReadStream = fs.createReadStream(`${__dirname}/about.txt`, 'utf8');
        myReadStream.pipe(res);
    } else {
        res.write('go to /about');
    }
});
server.listen(3000);
console.log('listesing from 3000 ....');
